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
