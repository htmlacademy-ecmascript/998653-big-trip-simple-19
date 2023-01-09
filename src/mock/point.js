import { getRandomArrayElement } from '../utils.js';
import { destinationsArr } from '../mock/destination.js';
//import { createDestinations } from '../mock/destination.js';
import { offersArr } from '../mock/offers.js';
// import { createOffersArr } from '../mock/offers.js';
import { POINT_TYPE } from '../constants/point-type.js';

const createPoit = (index) => ({
  price: 1100,
  start: '2019-07-10T22:55:56.845Z',
  end: '2019-07-11T11:22:13.375Z',
  //destination: getRandomArrayElement(createDestinations()), - почему не сработало?
  destination: getRandomArrayElement(destinationsArr), // должны идти по порядку или можно в разнобой?
  id: index,
  // offers: getRandomArrayElement(createOffersArr()), почему не сработало?
  offers: getRandomArrayElement(offersArr),
  type: POINT_TYPE[index],
});

const poitsArr = Array.from(
  { length: POINT_TYPE.length - 1 },
  (currentValue, index) => createPoit(index + 1)
);

function getRandomPoint() {
  return getRandomArrayElement(poitsArr);
}

// console.log(getRandomPoint()); - все работает
export { getRandomPoint };
