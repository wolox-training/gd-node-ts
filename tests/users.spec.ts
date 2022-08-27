import request from 'supertest';
import bcrypt from 'bcryptjs';
import userRepository from '../app/services/users';
import app from '../app';

describe('users', () => {
  beforeEach(() =>
    userRepository.createMany([
      {
        username: 'u1',
        lastname: 'u1',
        email: 'u1@wolox.com',
        password: bcrypt.hashSync('u1U1u1U1', 10)
      },
      {
        username: 'u2',
        lastname: 'u2',
        email: 'u2@wolox.com',
        password: bcrypt.hashSync('u2U2u2U2', 10)
      }
    ])
  );
  describe('/users GET', () => {
    it('should return all users', (done: jest.DoneCallback) => {
      request(app)
        .get('/users')
        .expect(200)
        .then((res: request.Response) => {
          expect(res.body.length).toBe(2);
          done();
        });
    });
  });
  describe('/users POST', () => {
    it('should create an user', (done: jest.DoneCallback) => {
      request(app)
        .post('/users')
        .send({
          username: 'u3',
          lastname: 'u3',
          email: 'u3@wolox.com',
          password: bcrypt.hashSync('u3U3u3U3', 10)
        })
        .expect(201)
        .then(async () => {
          const user = await userRepository.findUser({
            username: 'u3',
            lastname: 'u3',
            email: 'u3@wolox.com',
            password: bcrypt.hashSync('u3U3u3U3', 10)
          });
          expect(user).not.toBeNull();
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
