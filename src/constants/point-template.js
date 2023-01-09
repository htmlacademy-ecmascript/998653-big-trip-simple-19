import dayjs from 'dayjs';
import { POINT_TYPE } from './point-type.js';
import { OFFERS } from '../mock/offers.js';

const POINT_TEMPLATE = {
  price: 0,
  start: dayjs(),
  end: dayjs(),
  destination: POINT_TYPE[6],
  offers: OFFERS[1],
};

// console.log(POINT_TEMPLATE);
