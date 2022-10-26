import request from 'supertest';
import { u1, u2, tokenStandard } from '../app/constants/fakeData';
import userRepository from '../app/services/users';
import app from '../app';

describe('cards', () => {
  beforeEach(() => {
    userRepository.createMany([u1, u2]);
    jest.setTimeout(60000);
  });
  // afterEach(() => {
  //   jest.clearAllMocks();
  //   jest.resetAllMocks();
  // });
  describe('/info GET', () => {
    it('should get info cards', (done: jest.DoneCallback) => {
      request(app)
        .get('/info')
        .expect(200)
        .then((res: request.Response) => {
          expect(res).not.toBeNull();
          expect(res.status).toStrictEqual(200);
          done();
        });
    });
  });
  describe('/cards GET', () => {
    it('should get all cards', (done: jest.DoneCallback) => {
      request(app)
        .get('/cards')
        .expect(200)
        .then((res: request.Response) => {
          expect(res).not.toBeNull();
          expect(res.status).toStrictEqual(200);
          done();
        });
    });
    describe('/cards/:id POST', () => {
      it.skip('should return card with id 1', (done: jest.DoneCallback) => {
        request(app)
          .post('/cards/Story_10_Arthas_007p')
          .set(tokenStandard)
          .expect(201)
          .then(async (res: request.Response) => {
            const user = await userRepository.findUser(u2);
            expect(res).not.toBeNull();
            expect(res.text).toStrictEqual('Created Successfully');
            expect(user?.cards[0]).toEqual({
              artist: null,
              attack: null,
              cardId: 'Story_10_Arthas_007p',
              cardSet: 'Forged in the Barrens',
              collectible: null,
              cost: null,
              dbfId: '75673',
              durability: null,
              faction: null,
              flavor: null,
              health: null,
              id: 1,
              img: null,
              locale: 'enUS',
              name: 'Dark Determination',
              playerClass: 'Death Knight',
              race: null,
              rarity: null,
              text: `<b>Passive Hero Power</b>
If you have more minions than your opponent, draw a card at the start of your turn.`,
              type: 'Hero Power'
            });
            done();
          });
      });
      it('should return error card with id 1', (done: jest.DoneCallback) => {
        request(app)
          .post('/cards/prueba')
          .set(tokenStandard)
          .expect(400)
          .then((res: request.Response) => {
            // const user = await userRepository.findUser(u2);
            // expect(res).not.toBeNull();
            expect(res.text).toStrictEqual('Bad Request');
            done();
          });
      });
    });
  });
});
