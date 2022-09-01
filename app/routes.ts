import { Application } from 'express';

import { healthCheck } from './controllers/healthCheck';
import { getUsers, getUserById, getUserByEmail, createUser, adminUser } from './controllers/users';
import { getTodos } from './controllers/todos';
import { getHSinfo, getHScards } from './controllers/hearthstone';
import { validateSignUp, checkUser, validateSignIn, isStandard, isAdmin } from './middlewares/users';

export const init = (app: Application): void => {
  app.post('/admin/users', isAdmin, validateSignUp(), checkUser, adminUser);
  app.get('/health', healthCheck);
  app.get('/users', isStandard, getUsers);
  app.post('/users', validateSignUp(), checkUser, createUser);
  app.get('/users/:id', getUserById);
  app.post('/users/sessions', validateSignIn(), checkUser, getUserByEmail);
  app.get('/todos', getTodos);
  app.get('/info', getHSinfo);
  app.get('/cards', getHScards);
};
