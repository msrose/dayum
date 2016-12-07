'use strict';

let dayum = (count = 1) => {
  let tsd = 'da';
  while(count-- > 1) {
    tsd += 'a';
  }
  tsd += 'yum';
  return tsd;
};

dayum.random = (max = 100) => {
  return dayum(Math.floor(Math.random() * max) + 1);
};

const dayumRegex = /^d(a+)yum$/;

dayum.dayumify = (object, count = 0) => {
  if(count === 0 && Proxy) {
    return new Proxy(object, {
      get: (obj, prop) => {
        const result = dayumRegex.exec(String(prop));
        if(result) {
          const [, count] = result;
          return dayum.random.bind(count);
        }
        return obj[prop];
      }
    });
  } else {
    if(count === 0) {
      count = 50;
    }
    for(let i = 1; i <= count; i++) {
      const tsd = dayum(i);
      object[tsd] = dayum.random.bind(null, i);
    }
    return object;
  }
};

dayum = dayum.dayumify(dayum);

module.exports = dayum;
