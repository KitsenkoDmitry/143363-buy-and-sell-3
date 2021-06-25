"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {DEFAULT_COUNT, OfferType, SumRestrict, PictureRestrict, PICTURE_NAME, FILE_NAME, MAX_DESCRIPTION_LENGTH, ExitCodes, MAX_ID_LENGTH, MAX_COMMENTS} = require(`../../constants`);

const CATEGORIES_FILE = `./data/categories.txt`;
const SENTENCES_FILE = `./data/sentences.txt`;
const TITLES_FILE = `./data/titles.txt`;
const COMMENTS_FILE = `./data/comments.txt`;

const {
  getRandomInt,
  shuffle,
  getRandomItem
} = require(`../../utils`);

const readContent = async (fileName) => {
  try {
    const data = await fs.readFile(fileName, {encoding: `utf-8`});
    return data.trim().split(`\n`);
  } catch (e) {
    console.error(chalk.red(`Can't read file ${fileName}: ${e}`));
    return [];
  }
};

const getComments = (count, comments) => Array(count).fill({}).map(() => ({
  id: nanoid(MAX_ID_LENGTH),
  text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `)
}));

const getPictureFileName = (number) => {
  const replaceBy = number.toString().length === 1 ? `0${number}` : `${number}`;
  return PICTURE_NAME.replace(/XX/, replaceBy);
};

const generateOffers = (count, categories, sentences, titles, comments) => (Array(count).fill({}).map(() => ({
  id: nanoid(MAX_ID_LENGTH),
  category: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
  description: shuffle(sentences).slice(0, getRandomInt(1, MAX_DESCRIPTION_LENGTH)).join(` `),
  picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
  title: getRandomItem(titles),
  type: getRandomItem(Object.values(OfferType)),
  sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  comments: getComments(getRandomInt(1, MAX_COMMENTS), comments)
})));

module.exports = {
  name: `--generate`,
  run: async (args) => {
    const [count] = args;
    const offerCount = parseInt(count, 10) || DEFAULT_COUNT;
    const categories = await readContent(CATEGORIES_FILE);
    const sentences = await readContent(SENTENCES_FILE);
    const titles = await readContent(TITLES_FILE);
    const comments = await readContent(COMMENTS_FILE);

    const content = JSON.stringify(generateOffers(offerCount, categories, sentences, titles, comments));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`File ${FILE_NAME} was successfully created`));

    } catch (e) {
      console.error(chalk.red(`Can't write data to file: ${e}`));
      process.exit(ExitCodes.ERROR);
    }
  },
};
