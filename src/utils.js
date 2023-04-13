import dayjs from 'dayjs';
import { DATA_TIME_FORMAT } from './constans.js';

const getRandomInt = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

const getRandomArrayElement = (items) =>
  items[Math.floor(Math.random() * items.length)];

const humanizePointCurrentDatebyHtml = (currentDate) =>
  currentDate ? dayjs(currentDate).format(DATA_TIME_FORMAT.HTML) : '';

const humanizePointCurrentDateTimebyForm = (currentDate) =>
  currentDate
    ? dayjs(currentDate).format(DATA_TIME_FORMAT.POINT_DATE_TIME_FORM)
    : '';

const humanizePointCurrentDate = (currentDate) =>
  currentDate ? dayjs(currentDate).format(DATA_TIME_FORMAT.POINT_DATE) : '';

const humanizePointCurrentTime = (currentDate) =>
  currentDate ? dayjs(currentDate).format(DATA_TIME_FORMAT.POINT_TIME) : '';

const date = new Date();
// eslint-disable-next-line no-console
console.log(humanizePointCurrentDatebyHtml(date));

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}


export {
  getRandomArrayElement,
  getRandomInt,
  humanizePointCurrentDatebyHtml,
  humanizePointCurrentDateTimebyForm,
  humanizePointCurrentDate,
  humanizePointCurrentTime,
  updateItem
};
