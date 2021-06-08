"use strict";

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

const {DEFAULT_COUNT, OfferType, DATA_DIR, SumRestrict, PictureRestrict, PICTURE_NAME, FILE_NAME, MAX_DESCRIPTION_LENGTH, ExitCodes} = require(`../../constants`);
const {
  getRandomInt,
  shuffle,
  getRandomItem
} = require(`../../utils`);

const readFromFile = async (fileName) => {
  try {
    const data = await fs.readFile(fileName, {encoding: `utf-8`});
    return data.trim().split(`\n`);
  } catch (e) {
    console.error(chalk.red(`Can't read file ${fileName}: ${e}`));
    return [];
  }
};

const getPictureFileName = (number) => {
  const replaceBy = number.toString().length === 1 ? `0${number}` : `${number}`;
  return PICTURE_NAME.replace(/XX/, replaceBy);
};

const generateOffers = async (count) => {
  const categories = await readFromFile(`${DATA_DIR}/categories.txt`);
  const sentences = await readFromFile(`${DATA_DIR}/sentences.txt`);
  const titles = await readFromFile(`${DATA_DIR}/titles.txt`);

  return Array(count).fill({}).map(() => ({
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
    description: shuffle(sentences).slice(0, getRandomInt(1, MAX_DESCRIPTION_LENGTH)).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: getRandomItem(titles),
    type: getRandomItem(Object.values(OfferType)),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }));
};

module.exports = {
  name: `--generate`,
  run: async (args) => {
    const [count] = args;
    const offerCount = parseInt(count, 10) || DEFAULT_COUNT;
    const generatedOffers = await generateOffers(offerCount);
    const content = JSON.stringify(generatedOffers);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`File ${FILE_NAME} was successfully created`));

    } catch (e) {
      console.error(chalk.red(`Can't write data to file: ${e}`));
      process.exit(ExitCodes.ERROR);
    }
  },
};
