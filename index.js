/**
 * @author Michael Rose
 * @license https://github.com/msrose/dayum/blob/master/LICENSE
 */

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

const createRandomDayumRange = (midpoint) => {
  const variance = Math.max(Math.floor(midpoint / 2), 1);
  return dayum.random.bind(dayum, midpoint - variance, midpoint + variance);
};

/**
 * Adds all possible dayum methods to the given object.
 * If the environment supports proxies (and no `count` is specified),
 * you'll be able to call any `/da+yum/` method. Any dayum method returns a random two-syllable
 * dayum based on the number of "a"s in the method.
 * If there are no proxies (and no `count` is specified),
 * you'll only be able to call `/da{1,50}yum/` by default. :'(
 * @param {object} object The object to dayumify.
 * @param {number} [count=0] The number of dayum methods to add to `object`. 0 indicates all possible methods.
 * @returns {object} A shallow copy of the given `object`, dayumified
 * @example
 * const dayum = require('dayum');
 * const x = dayum.dayumify({ prop: 'hi!' });
 * x.prop; // 'hi!'
 * x.daaaaaaaaaayum(); // equivalent to dayum.random(5, 15)
 */
dayum.dayumify = (object, count = 0) => {
  if(count === 0 && typeof Proxy !== 'undefined') {
    return new Proxy(object, {
      get: (obj, prop) => {
        const result = dayumRegex.exec(String(prop));
        if(result) {
          const [, allAys] = result;
          return createRandomDayumRange(allAys.length);
        }
        return obj[prop];
      }
    });
  } else {
    if(count === 0) {
      count = 50;
    }
    const dayumifiedObject = {};
    for(const prop in object) {
      if(Object.prototype.hasOwnProperty.call(object, prop)) {
        dayumifiedObject[prop] = object[prop];
      }
    }
    for(let i = 1; i <= count; i++) {
      dayumifiedObject[dayum(i)] = createRandomDayumRange(i);
    }
    return dayumifiedObject;
  }
};

dayum = dayum.dayumify(dayum);

module.exports = dayum;
