/* eslint-disable */
export function normalizeToInterval(v, min, max) {
  if (max <= min) {
    return min;
  }

  const size = (max - min + 1);

  let index = min + ((v - min) % size);
  if (index < min) {
    index = size + index;
  }

  return index === 0 ? 0 : index; // fix for (-a % a) => -0
}

export function getEventKey(e) {
  return e.which || e.keyCode;
}

export function stopAndPrevent(e) {
  e.cancelable !== false && e.preventDefault();
  e.stopPropagation();
}

export function filter(terms, { field, list }) {
  const token = terms.toLowerCase();
  // eslint-disable-next-line prefer-template
  return list.filter(item => ('' + item[field]).toLowerCase().startsWith(token));
}

export default {
  normalizeToInterval,
  getEventKey,
  stopAndPrevent,
  filter,
};
