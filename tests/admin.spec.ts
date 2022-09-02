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
  describe('/admin/users POST', () => {
    it('should create an admin user', (done: jest.DoneCallback) => {
      request(app)
        .post('/admin/users')
        .set(
          'Authorization',
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huIiwibGFzdG5hbWUiOiJkb3ciLCJlbWFpbCI6ImpvaG4uZG93QHdvbG94LmNvbSIsInJvbGUiOiJhZG1pbiJ9.MWeUu0OO-bkB0ByLjMXRYiJH5fQ-ykL8iEkN6HNOBRQ'
        )
        .send({
          username: 'u3',
          lastname: 'u3',
          email: 'u3@wolox.com',
          password: bcrypt.hashSync('u3U3u3U3', 10)
        })
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
        .set(
          'Authorization',
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huIiwibGFzdG5hbWUiOiJkb3ciLCJlbWFpbCI6ImpvaG4uZG93QHdvbG94LmNvbSIsInJvbGUiOiJhZG1pbiJ9.MWeUu0OO-bkB0ByLjMXRYiJH5fQ-ykL8iEkN6HNOBRQ'
        )
        .send({
          username: 'u1',
          lastname: 'u1',
          email: 'u1@wolox.com',
          password: bcrypt.hashSync('u1U1u1U1', 10)
        })
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
        .send({
          username: 'u1',
          lastname: 'u1',
          email: 'u1@wolox.com',
          password: bcrypt.hashSync('u1U1u1U1', 10)
        })
        .expect(400)
        .then((res: request.Response) => {
          expect(res.body).toStrictEqual({ message: 'token is required' });
          done();
        });
    });
    it('should return error for admin user with user standard token', (done: jest.DoneCallback) => {
      request(app)
        .post('/admin/users')
        .set(
          'Authorization',
          'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NywidXNlcm5hbWUiOiJqb2huIDUiLCJsYXN0bmFtZSI6ImRvdyIsImVtYWlsIjoiam9obi5kb3cuNUB3b2xveC5jb20iLCJyb2xlIjoic3RhbmRhcmQifQ.NgE2fzjqTYBolCSG1MnvsW_3EXQsmfPXowH45IaZmUQ'
        )
        .send({
          username: 'u1',
          lastname: 'u1',
          email: 'u1@wolox.com',
          password: bcrypt.hashSync('u1U1u1U1', 10)
        })
        .expect(400)
        .then((res: request.Response) => {
          expect(res.body).toStrictEqual({ message: 'Permmission is not allowed' });
          done();
        });
    });
  });
});
