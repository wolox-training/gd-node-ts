import request from 'supertest';
import { u1, u2, tokenSingIn } from '../app/constants/fakeData';
import userRepository from '../app/services/users';
import app from '../app';

describe('session', () => {
  beforeEach(() => userRepository.createMany([u1, u2]));
  describe('/users/sessions POST', () => {
    it('should login an user', (done: jest.DoneCallback) => {
      request(app)
        .post('/users/sessions')
        .send({
          email: 'u2@wolox.com',
          password: 'u2U2u2U2'
        })
        .expect(200)
        .then((res: request.Response) => {
          expect(res.body).toStrictEqual({
            message: 'Login Successfully',
            token: tokenSingIn
          });
          done();
        });
    });
    it('should return error to login an user', (done: jest.DoneCallback) => {
      request(app)
        .post('/users/sessions')
        .send({
          email: 'u1@wolox.com',
          password: '1234'
        })
        .expect(400)
        .then((res: request.Response) => {
          expect(res.body).toStrictEqual({
            errors: [
              {
                location: 'body',
                msg: 'Should be alphanumeric',
                param: 'password',
                value: '1234'
              },
              {
                location: 'body',
                msg: 'Wrong email or password',
                param: 'password',
                value: '1234'
              }
            ]
          });
          done();
        });
    });
  });
});
