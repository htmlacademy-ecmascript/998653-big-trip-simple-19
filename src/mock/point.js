import { getRandomArrayElement } from '../utils.js';
import { getRandomInt } from '../utils.js';
import {PointType} from '../constans.js';
import dayjs from 'dayjs';

const POINTS_COUNT = 15;
const CITIES = [
  'Vienna',
  'Tirana',
  'Sofia',
  'London',
  'Dublin',
  'Madrid',
  'Rome',
  'Geneva',
  'Helsinki',
  'Paris',
];

const CITIES_DESCRIPTION = [
  'Is most populous city and its primate city, with about two million',
  'It is located in the centre of the country, enclosed by mountains and hills',
  'Has been an area of human habitation since at least 7000 BC',
  'It stands on the River in south-east at the head of a 50-mile (80 km) estuary down to the North Sea ',
  'A settlement was established in the area by the Gaels during or before the 7th century ',
  'The Madrid urban agglomeration has the second-largest in the European Union',
  'In 2019, town was the 14th most visited city in the world, with 8.6 million tourists, ',
  'Geneva, is a beautiful city, a true asian pearl, with crowded streets ',
  'Due to the large number of sea passengers per year, town is classed as a Large-Port City ',
  'Is a beautiful city, a true asian pearl, with crowded streets ',
];

const PHOTOS__DESCRIPTION = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const OFFERS = [
  'Upgrade to business',
  'Upgrade to comfort',
  'Upgrade to first class',
  'Travel with kids',
  'Travel with pets',
  'Luxury',
  'Elite',
  'Comfort',
  'Comfort+',
  'People with disabilities',
];

const getRandomType = () => {
  const randomTypeKey = getRandomArrayElement(Object.keys(PointType));
  return PointType[randomTypeKey];
};

const getRandomOffer = (index) => ({
  id: index + 1,
  title: getRandomArrayElement(OFFERS),
  price: getRandomInt(100, 2000)
});

const getPoint = (index) => ({
  id: index + 1 ,
  basePrice: getRandomInt(100, 2000),
  dateFrom: dayjs(),
  dateTo: dayjs().hour(3) ,
  destination: getRandomArrayElement(CITIES),
  offers: getRandomOffer(),
  type: getRandomType(),
});

const getPoints = () => Array.from({length: POINTS_COUNT}, (_, index) => getPoint(index));

const getDestination = (index) => ({
  id: index + 1 ,
  description: getRandomArrayElement(CITIES_DESCRIPTION),
  name: getRandomArrayElement(CITIES),
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${Math.random()}`,
      description: getRandomArrayElement(PHOTOS__DESCRIPTION)
    }
  ]
});

const getDestinations = () => Array.from({length: POINTS_COUNT}, (_, index) => getDestination(index));
export { getPoints, getDestinations };
