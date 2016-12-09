'use strict';

const dayum = require('../index');

describe('dayum', () => {
  it('generates a two-syllable damn', () => {
    expect(dayum()).toBe('dayum');
    expect(dayum(2)).toBe('daayum');
    expect(dayum(4)).toBe('daaaayum');
    expect(dayum(-1)).toBe('dayum');
  });

  it('has all the dayum methods you could want', () => {
    expect(dayum.dayum).toBeInstanceOf(Function);
    expect(dayum.daayum).toBeInstanceOf(Function);
    expect(dayum.daaaaaaaaaayum).toBeInstanceOf(Function);
    expect(dayum.daaaaaaaaaaaaaaaaaaaaayum).toBeInstanceOf(Function);
    expect(dayum.daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaayum).toBeInstanceOf(Function);
    expect(dayum.daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaayum).toBeInstanceOf(Function);
  });

  describe('random', () => {
    it('generates a random dayum', () => {
      expect(dayum.random(1)).toBe('dayum');
      expect(dayum.random()).toMatch(/^da+yum$/);
      expect(dayum.random(30)).toMatch(/^da+yum$/);
      expect(dayum.random(-30)).toMatch(/^da+yum$/);
    });
  });

  describe('dayumify', () => {
    it('adds all the dayum methods to a given object', () => {
      const obj = dayum.dayumify({ y: 44 }, 10);
      expect(obj.y).toBe(44);
      expect(obj.dayum).toBeInstanceOf(Function);
      expect(obj.daaayum).toBeInstanceOf(Function);
      expect(obj.daaaaaaaaaayum).toBeInstanceOf(Function);
      expect(obj.daaaaaaaaaaayum).toBeUndefined();
    });

    it('returns a dayum Proxy if no count is given', () => {
      const originalObj = { x: 23 };
      const obj = dayum.dayumify(originalObj);
      expect(obj).not.toBe(originalObj);
      expect(obj.x).toBe(23);
      expect(obj.daaaaaaaaaaaaaaaaaaaaaayum).toBeInstanceOf(Function);
    });

    it('returns a reference to a new dayum object', () => {
      const obj = {};
      const dayumifiedObject = dayum.dayumify(obj, 10);
      expect(obj).not.toBe(dayumifiedObject);
      expect(obj.daaayum).toBeUndefined();
      expect(dayumifiedObject.daaayum).toBeInstanceOf(Function);
    });
  });
});
