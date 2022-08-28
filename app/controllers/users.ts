import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import userService from '../services/users';
import { getToken } from '../services/session';
import { User } from '../models/user';
import { notFoundError } from '../errors';
import { HTTP_CODES } from '../constants';
import { successful } from '../constants/messages';
import logger from '../logger';

export function getUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return userService
    .findAll()
    .then((users: User[]) => res.send(users))
    .catch(next);
}

export function createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const { username, lastname, email, password } = req.body;
  return userService
    .createAndSave({ username, lastname, email, password } as User)
    .then((user: User) => {
      if (user) {
        logger.info(HTTP_CODES.CREATED);
        res.status(HttpStatus.CREATED).send(successful.CREATED);
      }
      logger.error(HTTP_CODES.BAD_REQUEST);
      res.status(HttpStatus.BAD_REQUEST).send(HTTP_CODES.BAD_REQUEST);
    })
    .catch((err: Error) => {
      logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
      next;
    });
}

export function getUserById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return userService
    .findUser({ id: parseInt(req.params.id) })
    .then((user: User) => {
      if (!user) {
        throw notFoundError('User not found');
      }
      return res.send(user);
    })
    .catch(next);
}

export function getUserByEmail(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  return userService
    .findUser({ email: req.body.email })
    .then((user: User) => {
      if (!user) {
        throw notFoundError('User e-mail not found');
      }
      const userObject = { ...user } as Partial<User>;
      delete userObject.password;
      const payload = userObject;
      const key = process.env.key as string;
      const algorithm = process.env.algorithm as string;
      const token = getToken(payload, key, algorithm);
      return res.status(200).send({ message: 'Login successfully', token });
    })
    .catch(next);
}
