export default (ISOdate) => {
  return new Date(ISOdate).toISOString().replace(/T.*/, '').split('-').reverse().join('-');
};
