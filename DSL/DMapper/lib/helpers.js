import aesDecrypt from "../js/decryption/aes.js";

const ENCRYPTION_KEY = 1234;

export function encryptMessage(message) {
  return aesEncrypt(message, ENCRYPTION_KEY);
}

export function decryptMessage(encryptedMessage) {
  return aesDecrypt(encryptedMessage, ENCRYPTION_KEY, false);
}
