'use strict';
const mockData = [{"id": `HNRt5`, "category": [`Посуда`], "description": `Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города.`, "picture": `item05.jpg`, "title": `Продам отличную подборку фильмов на VHS`, "type": `offer`, "sum": 20060, "comments": [{"id": `_dgJR`, "text": `Совсем немного... Неплохо, но дорого`}]}, {"id": `IQKSm`, "category": [`Еда`, `Авто`, `Животные`, `Журналы`, `Разное`, `Посуда`], "description": `Бонусом отдам все аксессуары. Товар в отличном состоянии.`, "picture": `item05.jpg`, "title": `Продам отличную подборку фильмов на VHS`, "type": `offer`, "sum": 17213, "comments": [{"id": `kSuBw`, "text": `С чем связана продажа? Почему так дешёво? Продаю в связи с переездом. Отрываю от сердца. А где блок питания?`}]}];
const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const SearchService = require(`../data-service/search`);
const {HttpCode} = require(`../../constants`);

const app = express();
app.use(express.json());
search(app, new SearchService(mockData));

describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({query: `Продам отличную подборку`});
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`2 offers found`, () => expect(response.body.length).toBe(2));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`HNRt5`));
});

test(`API returns 404 code if nothing is found`, async () => request(app).get(`/search`).query({query: `Продам почки`}).expect(HttpCode.NOT_FOUND));

test(`API returns 400 when query string is absent`, () => request(app).get(`/search`).expect(HttpCode.BAD_REQUEST));
