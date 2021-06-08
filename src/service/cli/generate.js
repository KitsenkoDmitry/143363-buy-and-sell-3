"use strict";

const fs = require(`fs`);
const chalk = require(`chalk`);
const {DEFAULT_COUNT, CATEGORIES, SENTENCES, TITLES, OfferType, SumRestrict, PictureRestrict, PICTURE_NAME, FILE_NAME, MAX_DESCRIPTION_LENGTH, ExitCodes} = require(`../../constants`);
const {
  getRandomInt,
  shuffle,
  getRandomItem
} = require(`../../utils`);

const getPictureFileName = (number) => {
  const replaceBy = number.toString().length === 1 ? `0${number}` : `${number}`;
  return PICTURE_NAME.replace(/XX/, replaceBy);
};


const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length)),
    description: shuffle(SENTENCES).slice(0, getRandomInt(1, MAX_DESCRIPTION_LENGTH)).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: getRandomItem(TITLES),
    type: getRandomItem(Object.values(OfferType)),
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
  }))
);

module.exports = {
  name: `--generate`,
  run: (args) => {
    const [count] = args;
    const offerCount = parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateOffers(offerCount));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(chalk.red(`Can't write data to file: ${err}`));
        process.exit(ExitCodes.ERROR);
      }
      console.info(chalk.green(`File ${FILE_NAME} was successfully created`));
    });
  },
};
