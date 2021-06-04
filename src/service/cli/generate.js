"use strict";

const fs = require(`fs`);
const chalk = require(`chalk`);
const {DEFAULT_COUNT, CATEGORIES, SENTENCES, TITLES, OfferType, SumRestrict, PictureRestrict, PICTURE_NAME, FILE_NAME} = require(`../../constants`);
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const getPictureFileName = (number) => {
  const replaceBy = number.toString().length === 1 ? `0${number}` : `${number}`;
  return PICTURE_NAME.replace(/XX/, replaceBy);
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
    description: shuffle(SENTENCES).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
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
      }
      console.info(chalk.green(`File ${FILE_NAME} was successfully created`));
    });
  },
};
