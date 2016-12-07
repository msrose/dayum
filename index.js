const dayum = (count = 1) => {
  let d = 'da';
  while(count-- > 1) {
    d += 'a';
  }
  d += 'yum';
  return  d;
};

module.exports = dayum;
