import bcrypt from 'bcryptjs';
import { body, ValidationChain, validationResult } from 'express-validator';
import { Response, Request, NextFunction } from 'express';
import { FindConditions } from 'typeorm';
import { decodeToken } from '../services/session';

import { User } from '../models/user';
import { findUser } from '../services/users';
import { error } from '../constants/messages';

export function validateSignUp(): ValidationChain[] {
  return [
    body('username')
      .notEmpty()
      .withMessage(error.EMPTY),
    body('lastname')
      .notEmpty()
      .withMessage(error.EMPTY),
    body('email')
      .notEmpty()
      .withMessage(error.EMPTY)
      .isEmail()
      .withMessage(error.INVALID_EMAIL)
      .custom((value: string) => {
        const withDomain = value.split('@');
        if (withDomain[1] === undefined) {
          return Promise.reject(error.INVALID_EMAIL);
        } else if (withDomain[1] !== 'wolox.com') {
          return Promise.reject(error.INVALID_DOMAIN);
        }
        return value;
      })
      .custom(async (value: string) => {
        const user = await findUser({ email: value } as FindConditions<User>);
        if (user) {
          throw new Error(error.EMAIL_DUPLICATE);
        }
      }),
    body('password')
      .matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/gm)
      .withMessage(error.PASSWORD_ALPHA)
  ];
}

export function validateSignIn(): ValidationChain[] {
  return [
    body('email')
      .notEmpty()
      .withMessage(error.EMPTY)
      .isEmail()
      .withMessage(error.INVALID_EMAIL)
      .custom((value: string) => {
        const withDomain = value.split('@');
        if (withDomain[1] === undefined) {
          return Promise.reject(error.INVALID_EMAIL);
        } else if (withDomain[1] !== 'wolox.com') {
          return Promise.reject(error.INVALID_DOMAIN);
        }
        return value;
      }),
    body('password')
      .matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/gm)
      .withMessage(error.PASSWORD_ALPHA)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .custom(async (value: string, { req }: any) => {
        const user = await findUser({ email: req.body.email } as FindConditions<User>);
        if (user) {
          const isSamePassword = bcrypt.compareSync(value, user.password);
          if (!isSamePassword) throw new Error(error.WRONG_PARAMS);
        }
      })
  ];
}

export function validateSignUpAdmin(): ValidationChain[] {
  return [
    body('username')
      .notEmpty()
      .withMessage(error.EMPTY),
    body('lastname')
      .notEmpty()
      .withMessage(error.EMPTY),
    body('email')
      .notEmpty()
      .withMessage(error.EMPTY)
      .isEmail()
      .withMessage(error.INVALID_EMAIL)
      .custom((value: string) => {
        const withDomain = value.split('@');
        if (withDomain[1] === undefined) {
          return Promise.reject(error.INVALID_EMAIL);
        } else if (withDomain[1] !== 'wolox.com') {
          return Promise.reject(error.INVALID_DOMAIN);
        }
        return value;
      }),
    body('password')
      .matches(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/gm)
      .withMessage(error.PASSWORD_ALPHA)
  ];
}

export function checkUser(req: Request, res: Response, next: NextFunction): Response | NextFunction | void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

export async function userExists(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | NextFunction | void> {
  if (!req.headers.authorization) return res.status(400).json(error.TOKEN_REQUIRED);

  const token = req.headers.authorization.split(' ')[1];
  const { key } = process.env;
  const user = decodeToken(token, key as string);

  const userToFind = await findUser({ email: user.email } as FindConditions<User>);
  if (!userToFind) return res.status(404).json(error.NOT_FOUND_USER);

  req.body.user = user;
  return next();
}

export async function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | NextFunction | void> {
  if (!req.headers.authorization) return res.status(400).json(error.TOKEN_REQUIRED);

  const token = req.headers.authorization.split(' ')[1];
  const { key } = process.env;
  const user = decodeToken(token, key as string);

  const userToFind = await findUser({ email: user.email } as FindConditions<User>);
  if (!userToFind) return res.status(404).json(error.NOT_FOUND_USER);

  if (userToFind.role === 'admin') {
    return next();
  }
  return res.status(400).json(error.PERMMISSION_NOT_ALLOW);
}

export default {
  checkUser,
  validateSignUp,
  validateSignIn,
  validateSignUpAdmin,
  userExists,
  isAdmin
};
