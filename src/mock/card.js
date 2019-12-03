export const locations = [`Amsterdam`, `Geneva`, `Berlin`, `Moscow`, `Airport`];
export const transfers = [
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
];
export const activities = [
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
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

const getRandomPhoto = () => `http://picsum.photos/300/150?r=${Math.random()}`;

const getRandomDescriprion = () =>
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

const generateCard = () => {
  const start = firstDate;
  firstDate = new Date(firstDate.setHours(firstDate.getHours() + getRandomNumber(1, 4)));
  const end = new Date(firstDate.setHours(firstDate.getHours() + getRandomNumber(1, 3)));

  return {
    type: getRandomArrayItem(transfers.concat(activities)),
    location: getRandomArrayItem(locations),
    start,
    end,
    offers: offers.slice().splice(getRandomNumber(0, 4), getRandomNumber(0, 4)),
    photos: Array(5)
      .fill(``)
      .map(getRandomPhoto),
    description: getRandomDescriprion(sentences),
    price: getRandomNumber(10, 100)
  };
};

export default generateCard;