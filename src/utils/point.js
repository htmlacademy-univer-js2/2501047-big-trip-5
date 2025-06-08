import dayjs from "dayjs";
const DATE_FORMAT = "MMM D";
const TIME_FORMAT = "HH:mm";
const DATE_FORMAT_EDIT = "DD/MM/YY";
 
function humanizeEventDueDate(dueDate) {
  return dueDate ? dayjs(dueDate).format(DATE_FORMAT) : "";
}
 
function humanizeEventDueDateEdit(dueDate) {
  return dueDate
    ? dayjs(dueDate).format(`${DATE_FORMAT_EDIT} ${TIME_FORMAT}`)
    : "";
}
function humanizeEventTime(dueDate) {
  return dueDate ? dayjs(dueDate).format(TIME_FORMAT) : "";
}
 
function formatDuration(dateFrom, dateTo) {
  const from = dayjs(dateFrom);
  const to = dayjs(dateTo);
 
  const diffMs = to.diff(from);
 
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
 
  const d = days > 0 ? `${days}D ` : "";
  const h = `${String(hours).padStart(2, "0")}H`;
  const m = `${String(minutes).padStart(2, "0")}M`;
 
  return `${d}${h} ${m}`;
}

function isPointFuture(point) {
  return (
    point.dateFrom && dayjs(point.dateFrom).isAfter(dayjs(), "day")
  );
}
 
function isPointPresent(point) {
  return (
    point.dateFrom && dayjs(point.dateFrom).isSame(dayjs(), "day")
  );
}
 
function isPointPast(point) {
  return (
    point.dateFrom && dayjs().isAfter(point.dateFrom, "day")
  );
}
 
function isPointEverything(point) {
  return true;
}

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) return 0;
  if (dateA === null) return 1;
  if (dateB === null) return -1;
  return null;
}

function sortDateDown(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);
  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}

function sortByTimeDown(pointA, pointB) {
  const durationA = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const durationB = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return durationB - durationA;
}

function sortByPriceDown(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export {
  humanizeEventDueDate,
  humanizeEventDueDateEdit,
  humanizeEventTime,
  formatDuration, 
  isPointFuture,
  isPointPresent,
  isPointPast,
  isPointEverything,
  sortDateDown,
  sortByTimeDown,
  sortByPriceDown,
};
