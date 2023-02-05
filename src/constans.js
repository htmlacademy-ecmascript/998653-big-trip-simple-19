const DATA_TIME_FORMAT = {
  HTML: 'YYYY-MM-DDTHH:mm',
  POINT_DATE_TIME_FORM: 'DD/MM/YY HH:mm',
  POINT_DATE: 'MMM DD',
  POINT_TIME: 'HH:mm',
};
export { DATA_TIME_FORMAT };


const PointType = {
  Taxi: 'taxi',
  Bus:'bus',
  Train: 'train',
  Ship: 'ship',
  Drive:'drive',
  Flight:'flight',
  CheckIn: 'check-in',
  Sightseeing:'sightseeing',
  Restaurant:'restaurant'};

const PointTypeDescription = {
  [PointType.Taxi]: 'Taxi',
  [PointType.Bus]: 'Bus',
  [PointType.Train]: 'Train',
  [PointType.Ship]: 'Ship',
  [PointType.Drive]: 'Drive',
  [PointType.Flight]: 'Flight',
  [PointType.CheckIn]: 'CheckIn',
  [PointType.Sightseeing]: 'Sightseeing',
  [PointType.Restaurant]: 'Restaurant',
};

export { PointType, PointTypeDescription};
