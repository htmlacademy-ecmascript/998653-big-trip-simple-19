import { POINT_TYPE } from '../constants/point-type.js';

const OFFERS = [
  '',
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

const PRICE = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

const createOffer = (index) => ({
  id: index,
  title: OFFERS[index],
  price: PRICE[index],
});

// const createOffersArr = () => {
//   Array.from({ length: OFFERS.length - 1 }, (currentValue, index) =>
//     createOffer(index + 1)
//   );
// };

// export { createOffersArr };

const offersArr = Array.from(
  { length: OFFERS.length - 1 },
  (currentValue, index) => createOffer(index + 1)
);

// console.log(offersArr);
export { offersArr, OFFERS };
