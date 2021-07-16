'use strict';
const express = require(`express`);
const request = require(`supertest`);
const category = require(`./category`);
const CategoryService = require(`../data-service/category`);
const {HttpCode} = require(`../../constants`);

const mock = [{"id": `KsCWx`, "category": [`Игры`, `Животные`, `Книги`, `Еда`, `Авто`], "description": `Почти что даром!`, "picture": `item15.jpg`, "title": `Продам автомобиль`, "type": `offer`, "sum": 39617, "comments": [{"id": `1WBOv`, "text": `Оплата наличными или перевод на карту? Вы что?! В магазине дешевле.`}, {"id": `hr7m2`, "text": `Неплохо, но дорого`}, {"id": `Wd71w`, "text": `Оплата наличными или перевод на карту?`}]}];


describe(`category request returns category list`, () => {
  let response;

  beforeAll(async () => {
    const app = express();
    app.use(express.json());
    category(app, new CategoryService(mock));
    response = await request(app).get(`/categories`);
  });

  test(`Expect 200 status code`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Expect 5 categories in response`, () => expect(response.body.length).toBe(5));

  test(`Categories are: Игры, Животные, Книги, Еда, Авто`, () => {
    const expected = [`Игры`, `Животные`, `Книги`, `Еда`, `Авто`];
    return expect(response.body).toEqual(expect.arrayContaining(expected));
  });
});
