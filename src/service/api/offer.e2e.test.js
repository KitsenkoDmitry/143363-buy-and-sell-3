'use strict';

const express = require(`express`);
const request = require(`supertest`);

const offer = require(`./offer`);
const OfferService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);
const {HttpCode} = require(`../../constants`);

const mock = [{"id": `NwsA4`, "category": [`Еда`, `Книги`, `Игры`, `Животные`, `Разное`], "description": `Таких предложений больше нет!`, "picture": `item05.jpg`, "title": `Куплю антиквариат`, "type": `offer`, "sum": 94962, "comments": [{"id": `WTOmr`, "text": `Вы что?! В магазине дешевле.`}, {"id": `gz_8r`, "text": `А где блок питания? А сколько игр в комплекте? Неплохо, но дорого`}, {"id": `0hSA_`, "text": `Неплохо, но дорого Оплата наличными или перевод на карту?`}]}, {"id": `hX52N`, "category": [`Разное`, `Игры`, `Книги`, `Журналы`], "description": `Продаю, потому что покупаю новую модель. Если найдёте дешевле — сброшу цену. Товар в отличном состоянии.`, "picture": `item09.jpg`, "title": `Куплю собрание сочинений Достоевского`, "type": `sale`, "sum": 50341, "comments": [{"id": `Hy__g`, "text": `Вы что?! В магазине дешевле. Оплата наличными или перевод на карту? Продаю в связи с переездом. Отрываю от сердца.`}, {"id": `k5ICW`, "text": `Совсем немного... Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии?`}, {"id": `BvhEJ`, "text": `Вы что?! В магазине дешевле. А сколько игр в комплекте?`}]}];

const createAPI = () => {
  const app = express();
  const clonedMock = JSON.parse(JSON.stringify(mock));
  app.use(express.json());
  offer(app, new OfferService(clonedMock), new CommentService());
  return app;
};

describe(`API returns list of offers`, () => {
  let response;

  beforeAll(async () => {
    const api = createAPI();
    response = await request(api).get(`/offers`);
  });

  test(`Get offers request is success 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns 2 offers`, () => expect(response.body.length).toBe(2));

  test(`First offer id is equal to `, () => expect(response.body[0].id).toBe(`NwsA4`));
});

describe(`API returns an offer with a given id`, () => {
  let response;

  beforeAll(async () => {
    const api = createAPI();
    response = await request(api).get(`/offers/NwsA4`);
  });

  test(`Status code for offer with id NwsA4 is 200`, () => {
    return expect(response.statusCode).toBe(HttpCode.OK);
  });

  test(`Offer title is Куплю антиквариат`, async () => {
    return expect(response.body.title).toBe(`Куплю антиквариат`);
  });
});
test(`ID 30303 is not found 404`, () => {
  return request(createAPI()).get(`/offers/30303`).expect(HttpCode.NOT_FOUND);
});

describe(`API creates an offer if data is valid`, () => {
  const newOffer = {
    category: [`Книги`],
    description: `Любимая книга детства. Идеальна для обычных людей`,
    picture: `image23.jpg`,
    title: `Букварь`,
    type: `Offer`,
    sum: 345,
  };

  let api;
  let response;

  beforeAll(async () => {
    api = createAPI();
    response = await request(api).post(`/offers/`).send(newOffer);
  });

  test(`Status code 201`, () => {
    return expect(response.statusCode).toBe(HttpCode.CREATED);
  });

  test(`Returns offer created`, () => {
    return expect(response.body).toEqual(expect.objectContaining(newOffer));
  });

  test(`Offers count is changed`, () => {
    return request(api).get(`/offers`).expect((res) => expect(res.body.length).toBe(3));
  });
});

describe(`API refuses to create an offer if data is invalid`, () => {
  const newOffer = {
    category: [`Книги`],
    description: `Любимая книга детства. Идеальна для обычных людей`,
    picture: `image23.jpg`,
    title: `Букварь`,
    type: `Offer`,
    sum: 345,
  };
  const api = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key in Object.keys(newOffer)) {
      if ({}.hasOwnProperty.call(newOffer, key)) {
        const badOffer = {...newOffer};
        delete badOffer[key];
        await request(api).post(`/offers`).send(badOffer).expect(HttpCode.BAD_REQUEST);
      }
    }
    return;
  });
});

describe(`API changes existent offer`, () => {

  const offerUpdates = {
    category: `Книги`,
    description: `Любимая книга детства. Идеальна для обычных людей`,
    picture: `image23.jpg`,
    title: `Букварь`,
    type: `Offer`,
    sum: 345
  };

  let response;

  beforeAll(async () => {
    const api = createAPI();
    response = await request(api).put(`/offers/NwsA4`).send(offerUpdates);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed offer`, () => expect(response.body).toEqual(expect.objectContaining(offerUpdates)));
  test(`Offer is really changed`, () => expect(response.body.title).toBe(offerUpdates.title));
});

test(`API returns status code 404 when trying to change non-existent offer`, () => {
  const offerUpdates = {
    category: `Книги`,
    description: `Любимая книга детства. Идеальна для обычных людей`,
    picture: `image23.jpg`,
    title: `Букварь`,
    type: `Offer`,
    sum: 345
  };
  return request(createAPI()).put(`/offers/nonExistingId`).send(offerUpdates).expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an offer with invalid data`, async () => {
  const offerUpdates = {
    category: `Книги`,
    description: `Любимая книга детства. Идеальна для обычных людей`,
    picture: `image23.jpg`,
    title: `Букварь`,
    type: `Offer`,
    sum: 345
  };
  const api = createAPI();
  for (const key in offerUpdates) {
    if ({}.hasOwnProperty.call(offerUpdates, key)) {
      const badOfferUpdates = {...offerUpdates};
      delete badOfferUpdates[key];
      await request(api).put(`/offers/NwsA4`).send(badOfferUpdates).expect(HttpCode.BAD_REQUEST);
    }
  }
  return;
});

describe(`API correctly deletes an offer`, () => {
  let response;
  let api;

  beforeAll(async () => {
    api = createAPI();
    response = await request(api).delete(`/offers/NwsA4`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted offer`, () => expect(response.body.id).toBe(`NwsA4`));
  test(`Offer count is 1 now`, () => request(api).get(`/offers`).expect((res) => expect(res.body.length).toBe(1)));

});

test(`API refuses to delete non-existent offer`, () => request(createAPI()).delete(`/offers/notExistingId`).expect(HttpCode.NOT_FOUND));

test(`API refuses to create a comment to non-existent offer and returns status code 404`, async () => {
  const api = createAPI();
  const newComment = {test: `hop hey la-la-lay`};
  const response = await request(api).post(`/offers/RANDOM_ID/comments`).send(newComment);
  return expect(response.statusCode).toBe(HttpCode.NOT_FOUND);
});

test(`API refuses to delete non-existent comment`, () => {
  const api = createAPI();
  return request(api).delete(`/offers/NwsA4/comments/NOT_EXISTING_COMMENT`).expect(HttpCode.NOT_FOUND);
});
