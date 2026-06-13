import { BulletinData } from "./types";

/**
 * Encodes BulletinData to a URL-safe Base64 string.
 */
export function encodeData(data: BulletinData): string {
  try {
    const jsonStr = JSON.stringify(data);
    return btoa(encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (_, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    }));
  } catch (e) {
    console.error("Failed to encode bulletin data:", e);
    return "";
  }
}

/**
 * Decodes a Base64 string back to BulletinData.
 */
export function decodeData(base64: string): BulletinData | null {
  try {
    const jsonStr = decodeURIComponent(atob(base64).split("").map((c) => {
      return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to decode bulletin data:", e);
    return null;
  }
}
