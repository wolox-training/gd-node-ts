import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status-codes';

import { UpdateResult } from 'typeorm';
import userService from '../services/users';
import { getToken } from '../services/session';
import { User } from '../models/user';
import { notFoundError } from '../errors';
import { HTTP_CODES } from '../constants';
import { successful } from '../constants/messages';
import logger from '../logger';

export function getUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  const options = {
    order: {
      id: req.query.order || 'DESC'
    },
    take: req.query.limit || 3,
    skip: req.query.skip || 0
  };
  return userService
    .findAll(options)
    .then((users: User[]) => {
      const userMapped = users.map((el: User) => {
        const userObjet = { ...el } as Partial<User>;
        delete userObjet.password;
        return userObjet;
      });
      res.send(userMapped);
    })
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
      } else {
        logger.error(HTTP_CODES.BAD_REQUEST);
        res.status(HttpStatus.BAD_REQUEST).send(HTTP_CODES.BAD_REQUEST);
      }
    })
    .catch((err: Error) => {
      logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
      next;
    });
}

export async function adminUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  req.body.role = 'admin';
  const userAdmin = req.body;
  const userToFind = await userService.findUser({ email: req.body.email });
  if (userToFind) {
    return userService
      .updateOne(userToFind.id, userAdmin)
      .then((user: UpdateResult) => {
        if (user) {
          logger.info(HTTP_CODES.CREATED);
          res.status(HttpStatus.CREATED).send(successful.UPDATED);
        } else {
          logger.error(HTTP_CODES.BAD_REQUEST);
          res.status(HttpStatus.BAD_REQUEST).send(HTTP_CODES.BAD_REQUEST);
        }
      })
      .catch((err: Error) => {
        logger.error({ error: err, message: HTTP_CODES.INTERNAL_SERVER_ERROR });
        next;
      });
  }
  return userService
    .createAndSave(userAdmin as User)
    .then((user: User) => {
      if (user) {
        logger.info(HTTP_CODES.CREATED);
        res.status(HttpStatus.CREATED).send(successful.CREATED);
      } else {
        logger.error(HTTP_CODES.BAD_REQUEST);
        res.status(HttpStatus.BAD_REQUEST).send(HTTP_CODES.BAD_REQUEST);
      }
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
