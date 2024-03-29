import request from 'supertest';
import { u0, u1, u2, u2fake, u3, u3fake, u3wolox, tokenStandard } from '../app/constants/fakeData';
import userRepository from '../app/services/users';
import app from '../app';

describe('users', () => {
  beforeEach(() => userRepository.createMany([u1, u2]));
  describe('/users GET', () => {
    it('should return all users', (done: jest.DoneCallback) => {
      request(app)
        .get('/users')
        .set(tokenStandard)
        .expect(200)
        .then((res: request.Response) => {
          expect(res.body.length).toBe(2);
          done();
        });
    });
    it('should return error because token missing', (done: jest.DoneCallback) => {
      request(app)
        .get('/users')
        .expect(400)
        .then((res: request.Response) => {
          expect(res.body).toStrictEqual('Token required');
          done();
        });
    });
  });
  describe('/users POST', () => {
    it('should create an user', (done: jest.DoneCallback) => {
      request(app)
        .post('/users')
        .send(u3)
        .expect(201)
        .then(async () => {
          const user = await userRepository.findUser(u3wolox);
          expect(user).not.toBeNull();
          done();
        });
    });
    it('should return error for user email already in use', (done: jest.DoneCallback) => {
      request(app)
        .post('/users')
        .send(u2fake)
        .expect(400)
        .then((res: request.Response) => {
          expect(res.body).toStrictEqual({
            errors: [{ location: 'body', msg: 'Already in use', param: 'email', value: 'u2@wolox.com' }]
          });
          done();
        });
    });
    it('should return error for user because password is invalid', (done: jest.DoneCallback) => {
      request(app)
        .post('/users')
        .send(u3fake)
        .expect(400)
        .then((res: request.Response) => {
          expect(res.body).toStrictEqual({
            errors: [{ location: 'body', msg: 'Should be alphanumeric', param: 'password', value: '1234' }]
          });
          done();
        });
    });
    it('should return error for user because all fields are empty', (done: jest.DoneCallback) => {
      request(app)
        .post('/users')
        .send(u0)
        .expect(400)
        .then((res: request.Response) => {
          expect(res.body).toStrictEqual({
            errors: [
              { location: 'body', msg: 'Cannot be empty', param: 'username', value: '' },
              { location: 'body', msg: 'Cannot be empty', param: 'lastname', value: '' },
              { location: 'body', msg: 'Cannot be empty', param: 'email', value: '' },
              { location: 'body', msg: 'Invalid format', param: 'email', value: '' },
              { location: 'body', msg: 'Invalid format', param: 'email', value: '' },
              { location: 'body', msg: 'Should be alphanumeric', param: 'password', value: '' }
            ]
          });
          done();
        });
    });
    describe('/users/:id GET', () => {
      it('should return user with id 1', (done: jest.DoneCallback) => {
        request(app)
          .get('/users/1')
          .expect(200)
          .then((res: request.Response) => {
            expect(res.body).toHaveProperty('username');
            expect(res.body).toHaveProperty('id');
            done();
          });
      });
      it('should return error for user with id 5', (done: jest.DoneCallback) => {
        request(app)
          .get('/users/5')
          .expect(404)
          .then((res: request.Response) => {
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('internal_code');
            done();
          });
      });
    });
  });
});
