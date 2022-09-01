import request from 'supertest';
import bcrypt from 'bcryptjs';
import userRepository from '../app/services/users';
import app from '../app';

describe('session', () => {
  beforeEach(() =>
    userRepository.createMany([
      {
        username: 'u1',
        lastname: 'u1',
        email: 'u1@wolox.com',
        password: bcrypt.hashSync('u1U1u1U1', 10),
        role: 'standard'
      },
      {
        username: 'u2',
        lastname: 'u2',
        email: 'u2@wolox.com',
        password: bcrypt.hashSync('u2U2u2U2', 10),
        role: 'standard'
      }
    ])
  );
  describe('/users/sessions POST', () => {
    it('should login an user', (done: jest.DoneCallback) => {
      request(app)
        .post('/users/sessions')
        .send({
          email: 'u1@wolox.com',
          password: 'u1U1u1U1'
        })
        .expect(200)
        .then((res: request.Response) => {
          expect(res.body).toStrictEqual({
            message: 'Login successfully',
            token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ1MSIsImxhc3RuYW1lIjoidTEiLCJlbWFpbCI6InUxQHdvbG94LmNvbSIsInJvbGUiOiJzdGFuZGFyZCJ9.UAHPyTxknEl8a5dWKseadItZ-4EgIDan_q4b8QnqHXs'
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
