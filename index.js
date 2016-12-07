'use strict';

let dayum = (count = 1) => {
  let tsd = 'da';
  while(count-- > 1) {
    tsd += 'a';
  }
  tsd += 'yum';
  return tsd;
};

dayum.random = (min = 100, max = min) => {
  if(min >= max) min = 1;
  return dayum(Math.max(Math.floor(Math.random() * (max - min + 1)) + min, 1));
};

const dayumRegex = /^d(a+)yum$/;

dayum.dayumify = (object, count = 0) => {
  if(count === 0 && Proxy) {
    return new Proxy(object, {
      get: (obj, prop) => {
        const result = dayumRegex.exec(String(prop));
        if(result) {
          const [, allAys] = result;
          const allAysCount = allAys.length;
          const halfAllAys = Math.max(Math.floor(allAysCount / 2), 1);
          return dayum.random.bind(dayum, allAysCount - halfAllAys, allAysCount + halfAllAys);
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
      object[tsd] = dayum.random.bind(dayum, i);
    }
    return object;
  }
};

dayum = dayum.dayumify(dayum);

module.exports = dayum;
