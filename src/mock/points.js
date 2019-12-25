const POINTS_COUNT = 3;
let id = 0;
export const locations = [`Amsterdam`, `Geneva`, `Berlin`, `Moscow`, `Airport`];
export const transfers = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`,
];
export const activities = [
  `check-in`,
  `sightseeing`,
  `restaurant`,
];
export const offers = [
  {
    name: `Add luggage`,
    type: `luggage`,
    price: 10,
  },
  {
    name: `Switch to comfort class`,
    type: `comfort`,
    price: 150,
  },
  {
    name: `Add meal`,
    type: `meal`,
    price: 2,
  },
  {
    name: `Choose seats`,
    type: `seats`,
    price: 9,
  },
  {
    name: `Travel by train`,
    type: `train`,
    price: 40,
  },
];
const sentences = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`
];

const shuffleArray = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const getRandomPhoto = () => `http://picsum.photos/300/150?r=${Math.random()}`;

export const getRandomDescriprion = () =>
  shuffleArray(sentences)
    .slice(0, getRandomNumber(1, 4))
    .join(` `);

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (start.getTime() - end.getTime()));
};
let firstDate = getDate(new Date(2019, 12, 10), new Date(2020, 2, 15));

const generatePoint = () => {
  const start = firstDate;
  firstDate = new Date(firstDate.setHours(firstDate.getHours() + getRandomNumber(1, 4)));
  const end = new Date(firstDate.setHours(firstDate.getHours() + getRandomNumber(1, 3)));

  return {
    id,
    type: getRandomArrayItem(transfers.concat(activities)),
    location: getRandomArrayItem(locations),
    date: start,
    start,
    end,
    offers: offers.slice().splice(getRandomNumber(0, 4), getRandomNumber(0, 4)),
    photos: Array(5)
      .fill(``)
      .map(getRandomPhoto),
    description: getRandomDescriprion(sentences),
    price: getRandomNumber(10, 100),
    favorite: false,
  };
};

const points = new Array(POINTS_COUNT).fill(``).map((point) => {
  id = id + 1;
  point = generatePoint();
  return point;
});

export default points;
