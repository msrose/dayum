'use strict';

/**
 * Generates a two-syllable damn
 * @param {number} [count=1] The number of "a"s in the two-syllable damn
 * @returns {string} A string representation of the two-syllable damn
 * @example
 * const dayum = require('dayum');
 * dayum(5); // 'daaaaayum'
 */
let dayum = (count = 1) => {
  let tsd = 'da';
  while(count-- > 1) {
    tsd += 'a';
  }
  tsd += 'yum';
  return tsd;
};

/**
 * Generates a two-syllable damn of random length
 * @param {number} [min=1] The fewest possible number of "a"s in the daymn
 * @param {number} [max=100] The greatest possible number of "a"s in the daymn
 * @returns {string} A string representation of the two-syllable damn
 * @example
 * const dayum = require('dayum');
 * dayum.random(5, 15); // 'daaaaaaaaaaayum'
 */
dayum.random = (min = 100, max = min) => {
  if(min >= max) min = 1;
  return dayum(Math.max(Math.floor(Math.random() * (max - min + 1)) + min, 1));
};

const dayumRegex = /^d(a+)yum$/;

/**
 * Adds all possible dayum methods to the given object.
 * If the environment supports proxies (and no `count` is specified),
 * you'll be able to call any `/da+yum/` method. Any dayum method returns a random two-syllable
 * dayum based on the number of "a"s in the method.
 * If there are no proxies (and no `count` is specified),
 * you'll only be able to call `/da{1,50}yum/` by default. :'(
 * @param {object} object The object to dayumify.
 * @param {number} [count=0] The number of dayum methods to add to `object`. 0 indicates all possible methods.
 * @returns {object} The given `object`, dayumified
 * @example
 * const dayum = require('dayum');
 * const x = dayum.dayumify({ prop: 'hi!' });
 * x.prop; // 'hi!'
 * x.daaaaaaaaaayum(); // equivalent to dayum.random(5, 15)
 */
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
