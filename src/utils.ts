import { BulletinData } from "./types";
import LZString from "lz-string";

/**
 * Encodes BulletinData to a highly compressed, URL-safe string.
 */
export function encodeData(data: BulletinData): string {
  try {
    const jsonStr = JSON.stringify(data);
    return LZString.compressToEncodedURIComponent(jsonStr);
  } catch (e) {
    console.error("Failed to encode bulletin data:", e);
    return "";
  }
}

/**
 * Decodes a compressed string back to BulletinData.
 */
export function decodeData(compressed: string): BulletinData | null {
  try {
    const jsonStr = LZString.decompressFromEncodedURIComponent(compressed);
    if (!jsonStr) return null;
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to decode bulletin data:", e);
    return null;
  }
}

/**
 * Shortens a URL using is.gd or v.gd via JSONP (bypassing CORS in browser environment).
 */
export function shortenUrl(longUrl: string): Promise<string> {
  const tryShortener = (baseUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Create a unique callback name
      const callbackName = `isgd_callback_${Math.floor(Math.random() * 1000000)}`;
      
      // Timeout of 7 seconds
      const timeoutId = setTimeout(() => {
        cleanup();
        reject(new Error(`${baseUrl} request timed out`));
      }, 7000);

      const cleanup = () => {
        clearTimeout(timeoutId);
        delete (window as any)[callbackName];
        const scriptElement = document.getElementById(callbackName);
        if (scriptElement) {
          scriptElement.remove();
        }
      };

      // Define callback globally
      (window as any)[callbackName] = (data: any) => {
        cleanup();
        if (data && data.shorturl) {
          resolve(data.shorturl);
        } else if (data && data.errormessage) {
          reject(new Error(data.errormessage));
        } else {
          reject(new Error(`Unknown error from ${baseUrl}`));
        }
      };

      // Create and append script tag
      const script = document.createElement("script");
      script.id = callbackName;
      script.src = `${baseUrl}/create.php?format=json&url=${encodeURIComponent(longUrl)}&callback=${callbackName}`;
      
      script.onerror = () => {
        cleanup();
        reject(new Error(`Failed to load script from ${baseUrl}`));
      };

      document.body.appendChild(script);
    });
  };

  // Try is.gd first, fall back to v.gd if it fails
  return tryShortener("https://is.gd")
    .catch((err) => {
      console.warn("is.gd shortening failed, trying v.gd...", err);
      return tryShortener("https://v.gd");
    });
}

/**
 * Asynchronously copies text to the clipboard while preserving user gesture context (essential for iOS Safari / WebViews).
 * It uses ClipboardItem with a Promise under the hood, and falls back to textarea execCommand if unsupported.
 */
export function copyTextAsync(longUrl: string, shortenFn: () => Promise<string>): Promise<string> {
  const urlPromise = shortenFn()
    .catch((err) => {
      console.warn("Shortening failed, using long URL:", err);
      return longUrl;
    });

  return new Promise((resolve, reject) => {
    // Check if ClipboardItem and write are supported
    if (typeof ClipboardItem !== "undefined" && navigator.clipboard && window.isSecureContext) {
      try {
        const textBlobPromise = urlPromise.then((url) => new Blob([url], { type: "text/plain" }));
        const item = new ClipboardItem({
          "text/plain": textBlobPromise
        });

        navigator.clipboard.write([item])
          .then(() => {
            urlPromise.then((url) => resolve(url));
          })
          .catch((err) => {
            console.warn("navigator.clipboard.write failed, falling back to legacy:", err);
            doLegacyFallback();
          });
        return;
      } catch (err) {
        console.warn("ClipboardItem constructor failed, falling back to legacy:", err);
      }
    }

    doLegacyFallback();

    function doLegacyFallback() {
      urlPromise.then((url) => {
        const success = copyTextLegacy(url);
        if (success) {
          resolve(url);
        } else {
          const fallbackSuccess = copyTextLegacy(longUrl);
          if (fallbackSuccess) {
            resolve(longUrl);
          } else {
            reject(new Error("Copy failed"));
          }
        }
      });
    }
  });
}

export function copyTextLegacy(text: string): boolean {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  textArea.style.top = "0";
  document.body.appendChild(textArea);
  
  // Highlight/select the text
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Legacy copy failed:", err);
    document.body.removeChild(textArea);
    return false;
  }
}

