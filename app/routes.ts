import { Application } from 'express';

import { healthCheck } from './controllers/healthCheck';
import { getUsers, getUserById, createUser } from './controllers/users';
import { getTodos } from './controllers/todos';
import { getHSinfo, getHScards } from './controllers/hearthstone';
import { validate, checkUser } from './middlewares/signUp';

export const init = (app: Application): void => {
  app.get('/health', healthCheck);
  app.get('/users', getUsers);
  app.post('/users', validate(), checkUser, createUser);
  app.get('/users/:id', getUserById);
  app.get('/todos', getTodos);
  app.get('/info', getHSinfo);
  app.get('/cards', getHScards);
};
