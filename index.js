const dayum = (count = 1) => {
  let d = 'da';
  while(count-- > 1) {
    d += 'a';
  }
  d += 'yum';
  return  d;
};

dayum.random = (max = 100) => {
  return dayum(Math.floor(Math.random() * max) + 1);
};

module.exports = dayum;
