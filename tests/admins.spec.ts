import request from 'supertest';
import { u1, u2, u3, tokenStandard, tokenAdmin } from '../app/constants/fakeData';
import userRepository from '../app/services/users';
import app from '../app';

describe('users', () => {
  beforeEach(() => userRepository.createMany([u1, u2]));
  describe('/admin/users POST', () => {
    it('should create an admin user', (done: jest.DoneCallback) => {
      request(app)
        .post('/admin/users')
        .set(tokenAdmin)
        .send(u3)
        .expect(201)
        .then(async (res: request.Response) => {
          const user = await userRepository.findUser({
            email: 'u3@wolox.com'
          });
          expect(user).not.toBeNull();
          expect(res.text).toStrictEqual('Created Successfully');
          done();
        });
    });
    it('should update an admin user', (done: jest.DoneCallback) => {
      request(app)
        .post('/admin/users')
        .set(tokenAdmin)
        .send(u1)
        .expect(201)
        .then(async (res: request.Response) => {
          const user = await userRepository.findUser({
            email: 'u1@wolox.com'
          });
          expect(user).not.toBeNull();
          expect(user).toHaveProperty('role');
          expect(res.text).toStrictEqual('Updated Successfully');
          done();
        });
    });
    it('should return error for admin user without token', (done: jest.DoneCallback) => {
      request(app)
        .post('/admin/users')
        .send(u1)
        .expect(400)
        .then((res: request.Response) => {
          expect(res.body).toStrictEqual({ message: 'token is required' });
          done();
        });
    });
    it('should return error for admin user with user standard token', (done: jest.DoneCallback) => {
      request(app)
        .post('/admin/users')
        .set(tokenStandard)
        .send(u1)
        .expect(400)
        .then((res: request.Response) => {
          expect(res.body).toStrictEqual({ message: 'Permmission is not allowed' });
          done();
        });
    });
  });
});
