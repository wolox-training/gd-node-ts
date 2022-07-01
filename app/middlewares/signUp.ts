import { body, ValidationChain, validationResult } from 'express-validator';
import { Response, Request, NextFunction } from 'express';
import { FindConditions } from 'typeorm';

import { User } from '../models/user';
import { findUser } from '../services/users';
import { error } from '../constants/messages';

export function validate(): ValidationChain[] {
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

export function checkUser(req: Request, res: Response, next: NextFunction): Response | NextFunction | void {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}

export default {
  checkUser,
  validate
};
