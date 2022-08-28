import { Application } from 'express';

import { healthCheck } from './controllers/healthCheck';
import { getUsers, getUserById, getUserByEmail, createUser } from './controllers/users';
import { getTodos } from './controllers/todos';
import { getHSinfo, getHScards } from './controllers/hearthstone';
import { validateSignUp, checkUser, validateSignIn } from './middlewares/users';

export const init = (app: Application): void => {
  app.get('/health', healthCheck);
  app.get('/users', getUsers);
  app.post('/users', validateSignUp(), checkUser, createUser);
  app.get('/users/:id', getUserById);
  app.post('/users/sessions', validateSignIn(), checkUser, getUserByEmail);
  app.get('/todos', getTodos);
  app.get('/info', getHSinfo);
  app.get('/cards', getHScards);
};
