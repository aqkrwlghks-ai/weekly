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

