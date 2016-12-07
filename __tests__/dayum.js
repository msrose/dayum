'use strict';

const dayum = require('..');

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
      const obj = dayum.dayumify({}, 10);
      expect(obj.dayum()).toBe('dayum');
      expect(obj.daaayum).toBeInstanceOf(Function);
      expect(obj.daaaaaaaaaayum).toBeInstanceOf(Function);
      expect(obj.daaaaaaaaaaayum).toBeUndefined();
    });

    it('returns a dayum Proxy if no count is given', () => {
      const obj = dayum.dayumify({ x: 23 });
      expect(obj.x).toBe(23);
      expect(obj.daaaaaaaaaaaaaaaaaaaaaayum).toBeInstanceOf(Function);
    });
  });
});
