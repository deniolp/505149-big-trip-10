export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
const activities = [`Check-in`, `Sightseeing`, `Restaurant`];

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

const addNullToTime = (time) => {
  return time > 9 ? time : `0` + time;
};

export const getDiff = (time) => {
  const hours = addNullToTime(new Date(time).getUTCHours());
  const minutes = addNullToTime(new Date(time).getUTCMinutes());
  return `${hours}H ${minutes}M`;
};

export const getPrefix = (type) => {
  return activities.some((it) => it === type) ? `at` : `to`;
};
