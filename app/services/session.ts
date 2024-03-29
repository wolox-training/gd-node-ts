import jwt from 'jwt-simple';
import { User } from '../models/user';

import config from '../../config';

const SECRET: string = config.common.session.secret;

export const HEADER_NAME = config.common.session.header_name;

export function encode(toEncode: string): string {
  return jwt.encode(toEncode, SECRET);
}

export function decode<T>(toDecode: string): T {
  return jwt.decode(toDecode, SECRET);
}

export function getToken(payload: object, key: string, algorithm: string): string {
  return jwt.encode(payload, key, algorithm);
}

export function decodeToken(token: string, key: string): User {
  return jwt.decode(token, key);
}

export default {
  encode,
  decode,
  getToken,
  decodeToken
};
