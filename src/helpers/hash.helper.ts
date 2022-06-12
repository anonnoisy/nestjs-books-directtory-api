import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

// Encrypt password
export const encryption = async (password: string): Promise<string> => {
  const salt = randomBytes(8).toString('hex');
  const hash = (await promisify(scrypt)(password, salt, 32)) as Buffer;

  return salt + '.' + hash.toString('hex');
};

// Decrypt password
export const decryption = async (
  inputPass: string,
  savedPass: string,
): Promise<boolean> => {
  const [salt, storedHash] = savedPass.split('.');
  const hash = (await promisify(scrypt)(inputPass, salt, 32)) as Buffer;

  return storedHash === hash.toString('hex');
};
