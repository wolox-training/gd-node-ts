import { Application } from 'express';

import { healthCheck } from './controllers/healthCheck';
import { getTodos } from './controllers/todos';
import usersControllers from './controllers/users';
import cardsControllers from './controllers/cards';
import setsControllers from './controllers/sets';
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
  app.get('/users', usersMiddlewares.userExists, usersControllers.getUsers);
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
  app.get('/info', cardsControllers.getHSinfo);
  app.get('/cards', cardsControllers.getHScards);
  app.post('/cards/:id', usersMiddlewares.userExists, cardsControllers.createHScard);
  app.post('/decks', usersMiddlewares.userExists, setsControllers.createHSSet);
};
