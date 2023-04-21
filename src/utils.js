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

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

function getWeightForNullDate(dateA, dateB) {
  if(dateA === null && dateB === null) {
    return 0;
  }

  if(dateA === null) {
    return 1;
  }

  if(dateB === null) {
    return -1;
  }

  return null;
}

function sortDateUp(pointA, pointB) {
  const weigth = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  //метод diff вычисляет разницу между 2-мя  датами
  return weigth ?? dayjs(pointA.dateFrom).diff((dayjs(pointB.dateFrom))); //почему 2 ??
}

function sortDateDown(pointA, pointB) {
  const weigth = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  //метод diff вычисляет разницу между 2-мя  датами
  return weigth ?? dayjs(pointB.dateFrom).diff((dayjs(pointA.dateFrom))); //почему 2 ??
}

export {
  getRandomArrayElement,
  getRandomInt,
  humanizePointCurrentDatebyHtml,
  humanizePointCurrentDateTimebyForm,
  humanizePointCurrentDate,
  humanizePointCurrentTime,
  updateItem,
  getWeightForNullDate,
  sortDateUp,
  sortDateDown
};
