import request from 'supertest';
import { u1, u2, tokenStandard } from '../app/constants/fakeData';
import userRepository from '../app/services/users';
import app from '../app';

describe('sets', () => {
  beforeEach(() => {
    userRepository.createMany([u1, u2]);
  });
  describe('/decks POST', () => {
    it('should return set with id 1', (done: jest.DoneCallback) => {
      request(app)
        .post('/decks')
        .set(tokenStandard)
        .send({ setName: 'Druid' })
        .expect(201)
        .then((res: request.Response) => {
          expect(res).not.toBeNull();
          expect(res.text).toStrictEqual('Created Successfully');
          done();
        });
    });
    it.skip('should return error with invalid setName', (done: jest.DoneCallback) => {
      request(app)
        .post('/decks')
        .set(tokenStandard)
        .send({ setName: 'Drui' })
        .expect(404)
        .then((res: request.Response) => {
          expect(res.text).toStrictEqual('Not found');
          done();
        });
    });
  });
});
