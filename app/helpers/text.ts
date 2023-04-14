export const capitalize = (str) => {
  if (!str) {
    return str;
  }
  if (typeof str !== 'string') {
    return '';
  }
  return str[0].toUpperCase() + str.slice(1);
};
