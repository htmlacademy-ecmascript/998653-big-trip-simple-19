import { getRandomArrayElement } from '../utils.js';
import { getRandomInt } from '../utils.js';

const NAME = [
  '',
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

const NAME_DESCRIPTION = [
  '',
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

const PHOTO__DESCRIPTION = [
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

const createDestination = (index) => ({
  id: index,
  description: NAME_DESCRIPTION[index],
  name: NAME[index],
  pictures: [
    {
      src: `http://picsum.photos/300/200?r=${getRandomInt()}`,
      description: `${getRandomArrayElement(PHOTO__DESCRIPTION)}`,
    },
  ],
});

const destinationsArr = Array.from(
  { length: NAME.length - 1 },
  (currentValue, index) => createDestination(index + 1)
);

// const createDestinations = () =>
//   Array.from({ length: NAME.length - 1 }, (currentValue, index) =>
//     createDestination(index + 1)
//   );
// console.log(destinationsArr);

export { destinationsArr };
