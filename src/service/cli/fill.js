"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {DEFAULT_COUNT, OfferType, SumRestrict, PictureRestrict, PICTURE_NAME, MAX_DESCRIPTION_LENGTH, ExitCodes, MAX_COMMENTS} = require(`../../constants`);

const FILE_NAME = `fill-db.sql`;
const CATEGORIES_FILE = `./data/categories.txt`;
const SENTENCES_FILE = `./data/sentences.txt`;
const TITLES_FILE = `./data/titles.txt`;
const COMMENTS_FILE = `./data/comments.txt`;

const {
  getRandomInt,
  shuffle,
  getRandomItem
} = require(`../../utils`);

const users = [
  {
    email: `ivanov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Иван`,
    lastName: `Иванов`,
    avatar: `avatar1.jpg`
  }, {
    email: `petrov@example.com`,
    passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
    firstName: `Пётр`,
    lastName: `Петров`,
    avatar: `avatar2.jpg`
  }
];

const readContent = async (fileName) => {
  try {
    const data = await fs.readFile(fileName, {encoding: `utf-8`});
    return data.trim().split(`\n`);
  } catch (e) {
    console.error(chalk.red(`Can't read file ${fileName}: ${e}`));
    return [];
  }
};

const generateComments = (count, offerId, userCount, comments) =>
  Array(count).fill({}).map(() => ({
    userId: getRandomInt(1, userCount),
    offerId,
    text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `)
  }));


const getPictureFileName = (number) => {
  const replaceBy = number.toString().length === 1 ? `0${number}` : `${number}`;
  return PICTURE_NAME.replace(/XX/, replaceBy);
};

const generateOffers = (count, titles, categoryCount, userCount, sentences, comments) => (Array(count).fill({}).map((_, index) => ({
  category: [getRandomInt(1, categoryCount)],
  description: shuffle(sentences).slice(0, getRandomInt(1, MAX_DESCRIPTION_LENGTH)).join(` `),
  picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
  title: getRandomItem(titles),
  type: getRandomItem(Object.values(OfferType)),
  sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  comments: generateComments(getRandomInt(1, MAX_COMMENTS), index + 1, userCount, comments),
  userId: getRandomInt(1, userCount),
})));

module.exports = {
  name: `--fill`,
  run: async (args) => {
    const [count] = args;
    const offerCount = parseInt(count, 10) || DEFAULT_COUNT;
    const categories = await readContent(CATEGORIES_FILE);
    const sentences = await readContent(SENTENCES_FILE);
    const titles = await readContent(TITLES_FILE);
    const commentSentences = await readContent(COMMENTS_FILE);

    const offers = generateOffers(offerCount, titles, categories.length, users.length, sentences, commentSentences);

    const comments = offers.flatMap((offer) => offer.comments);
    const offerCategories = offers.map((offer, index) => ({offerId: index + 1, categoryId: offer.category[0]}));

    const userValues = users.map(
        ({email, passwordHash, firstName, lastName, avatar}) =>
          `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`
    ).join(`,\n`);

    const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

    const offerValues = offers.map(
        ({title, description, type, sum, picture, userId}) =>
          `('${title}', '${description}', '${type}', ${sum}, '${picture}', ${userId})`
    ).join(`,\n`);

    const offerCategoryValues = offerCategories.map(
        ({offerId, categoryId}) =>
          `(${offerId}, ${categoryId})`
    ).join(`,\n`);

    const commentValues = comments.map(
        ({text, userId, offerId}) =>
          `('${text}', ${userId}, ${offerId})`
    ).join(`,\n`);

    const content = `INSERT INTO users(email, password_hash, first_name, last_name, avatar) VALUES ${userValues};\n\nINSERT INTO categories(name) VALUES\n${categoryValues};\n\nALTER TABLE offers DISABLE TRIGGER ALL;\nINSERT INTO offers(title, description, type, sum, picture, user_id) VALUES\n${offerValues};\nALTER TABLE offers ENABLE TRIGGER ALL;\n\nALTER TABLE offer_categories DISABLE TRIGGER ALL;\nINSERT INTO offer_categories(offer_id, category_id) VALUES\n${offerCategoryValues};\nALTER TABLE offer_categories ENABLE TRIGGER ALL;\n\nALTER TABLE comments DISABLE TRIGGER ALL;\nINSERT INTO COMMENTS(text, user_id, offer_id) VALUES\n${commentValues};\nALTER TABLE comments ENABLE TRIGGER ALL;`;

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`File ${FILE_NAME} was successfully created`));

    } catch (e) {
      console.error(chalk.red(`Can't write data to file: ${e}`));
      process.exit(ExitCodes.ERROR);
    }
  },
};
