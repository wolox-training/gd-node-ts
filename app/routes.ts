import { Application } from 'express';

import { healthCheck } from './controllers/healthCheck';
import usersControllers from './controllers/users';
import { getTodos } from './controllers/todos';
import hearthstoneControllers from './controllers/hearthstone';
import usersMiddlewares from './middlewares/users';

export const init = (app: Application): void => {
  app.post(
    '/admin/users',
    usersMiddlewares.isAdmin,
    usersMiddlewares.validateSignUpAdmin(),
    usersMiddlewares.checkUser,
    usersControllers.adminUser
  );
  app.get('/health', healthCheck);
  app.get('/users', usersMiddlewares.isStandardOrAdmin, usersControllers.getUsers);
  app.post(
    '/users',
    usersMiddlewares.validateSignUp(),
    usersMiddlewares.checkUser,
    usersControllers.createUser
  );
  app.get('/users/:id', usersControllers.getUserById);
  app.post(
    '/users/sessions',
    usersMiddlewares.validateSignIn(),
    usersMiddlewares.checkUser,
    usersControllers.getUserByEmail
  );
  app.get('/todos', getTodos);
  app.get('/info', hearthstoneControllers.getHSinfo);
  app.get('/cards', hearthstoneControllers.getHScards);
  app.post('/cards/:id', usersMiddlewares.isStandardOrAdmin, hearthstoneControllers.createHScard);
  app.post('/decks', hearthstoneControllers.createHSset);
};
