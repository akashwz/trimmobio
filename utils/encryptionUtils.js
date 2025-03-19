import CryptoJS from "crypto-js";

const ENCRYPTION_KEY = CryptoJS.enc.Hex.parse(
  "0ad3672f085bed96ccb48eddde1692041901b99b43412e7dd7bc9652bf7674d6",
); // 256 bits (32 bytes)
const IV_LENGTH = 16;
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;

// Encryption function
export function encryptData(text) {
  try {
    if (environment === "PROD") {
      // Generate random IV (must be 16 bytes)
      const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
      // Encrypt the text
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(text), ENCRYPTION_KEY, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      // Combine IV and encrypted text into one string
      const result =
        iv.toString(CryptoJS.enc.Hex) + ":" + encrypted.ciphertext.toString(CryptoJS.enc.Hex);
      return { encrypted: result };
    } else {
      return text;
    }
  } catch (error) {
    return null;
  }
}

// Decryption function
export function decryptData(text) {
  try {
    if (environment === "PROD") {
      const parts = text.split(":");
      if (parts.length !== 2) throw new Error("Invalid encrypted data format");

      const iv = CryptoJS.enc.Hex.parse(parts[0]);
      const encryptedText = CryptoJS.enc.Hex.parse(parts[1]);

      // Decrypt the text
      const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedText }, ENCRYPTION_KEY, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      const result = decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(result);
    } else {
      return text;
    }
  } catch (error) {
    return null;
  }
}

export function encryptDevData(text) {
  try {
    // Generate random IV (must be 16 bytes)
    const iv = CryptoJS.lib.WordArray.random(IV_LENGTH);
    // Encrypt the text
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(text), ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    // Combine IV and encrypted text into one string
    const result =
      iv.toString(CryptoJS.enc.Hex) + ":" + encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    return { encrypted: result };
  } catch (error) {
    return null;
  }
}

export function decryptDevData(text) {
  try {
    const parts = text.split(":");
    if (parts.length !== 2) throw new Error("Invalid encrypted data format");

    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const encryptedText = CryptoJS.enc.Hex.parse(parts[1]);

    // Decrypt the text
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedText }, ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    const result = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(result);
  } catch (error) {
    return null;
  }
}
