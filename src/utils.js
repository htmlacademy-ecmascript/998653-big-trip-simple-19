import dayjs from 'dayjs';
import { DATA_TIME_FORMAT } from './constants/data-time-format.js';

function getRandomInt() {
  return Math.random();
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointCurrentDatebyHtml(currentDate) {
  return currentDate ? dayjs(currentDate).format(DATA_TIME_FORMAT.HTML) : '';
}

function humanizePointCurrentDateTimebyForm(currentDate) {
  return currentDate
    ? dayjs(currentDate).format(DATA_TIME_FORMAT.POINT_DATE_TIME_FORM)
    : '';
}

function humanizePointCurrentDate(currentDate) {
  return currentDate
    ? dayjs(currentDate).format(DATA_TIME_FORMAT.POINT_DATE)
    : '';
}

function humanizePointCurrentTime(currentDate) {
  return currentDate
    ? dayjs(currentDate).format(DATA_TIME_FORMAT.POINT_TIME)
    : '';
}

export {
  getRandomArrayElement,
  getRandomInt,
  humanizePointCurrentDatebyHtml,
  humanizePointCurrentDateTimebyForm,
  humanizePointCurrentDate,
};

// const date = new Date();
// console.log(humanizePointCurrentTime(date));
