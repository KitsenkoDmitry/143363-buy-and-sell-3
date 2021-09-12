INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES ('ivanov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Иван', 'Иванов', 'avatar1.jpg'),
('petrov@example.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'Пётр', 'Петров', 'avatar2.jpg');

INSERT INTO categories(name) VALUES
('Книги'),
('Разное'),
('Посуда'),
('Игры'),
('Животные'),
('Журналы'),
('Еда'),
('Авто');

ALTER TABLE offers DISABLE TRIGGER ALL;
INSERT INTO offers(title, description, type, sum, picture, user_id) VALUES
('Куплю антиквариат', 'Если найдёте дешевле — сброшу цену. Почти что даром!', 'offer', 4772, 'item10.jpg', 2),
('Продам автомобиль', 'Даю недельную гарантию.', 'sale', 95792, 'item14.jpg', 2),
('Продам новую приставку Sony Playstation 5', 'Даю недельную гарантию. Бонусом отдам все аксессуары. При покупке с меня бесплатная доставка в черте города. Продаю, потому что покупаю новую модель.', 'offer', 1794, 'item05.jpg', 2),
('Продам новую приставку Sony Playstation 5', 'Это настоящая находка для коллекционера!', 'offer', 57609, 'item05.jpg', 1);
ALTER TABLE offers ENABLE TRIGGER ALL;

ALTER TABLE offer_categories DISABLE TRIGGER ALL;
INSERT INTO offer_categories(offer_id, category_id) VALUES
(1, 1),
(2, 4),
(3, 6),
(4, 4);
ALTER TABLE offer_categories ENABLE TRIGGER ALL;

ALTER TABLE comments DISABLE TRIGGER ALL;
INSERT INTO COMMENTS(text, user_id, offer_id) VALUES
('Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту?', 2, 1),
('Почему в таком ужасном состоянии?', 2, 1),
('Продаю в связи с переездом. Отрываю от сердца. Почему в таком ужасном состоянии? Неплохо, но дорого', 2, 1),
('Совсем немного...', 1, 2),
('Оплата наличными или перевод на карту?', 1, 2),
('Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте? Неплохо, но дорого', 1, 2),
('Почему в таком ужасном состоянии?', 2, 3),
('Неплохо, но дорого А где блок питания?', 1, 3),
('Неплохо, но дорого Вы что?! В магазине дешевле.', 2, 3),
('С чем связана продажа? Почему так дешёво? Оплата наличными или перевод на карту?', 2, 4),
('Неплохо, но дорого Оплата наличными или перевод на карту? А сколько игр в комплекте?', 2, 4),
('С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии? Совсем немного...', 1, 4);
ALTER TABLE comments ENABLE TRIGGER ALL;
