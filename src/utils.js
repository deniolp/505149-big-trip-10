export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
const activities = [`Check-in`, `Sightseeing`, `Restaurant`];

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(createElement(element));
      break;
    case RenderPosition.BEFOREEND:
      container.append(createElement(element));
      break;
  }
};

const getPefix = (type) => {
  return activities.some((it) => it === type) ? `at` : `to`;
};

export default getPefix;
