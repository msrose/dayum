const dayum = require('..');

describe('dayum', () => {
  it('generates a two-syllable damn', () => {
    expect(dayum()).toBe('dayum');
    expect(dayum(2)).toBe('daayum');
    expect(dayum(4)).toBe('daaaayum');
    expect(dayum(-1)).toBe('dayum');
  });

  it('generates a random dayum', () => {
    expect(dayum.random(1)).toBe('dayum');
    expect(dayum.random()).toMatch(/^da+yum$/);
    expect(dayum.random(30)).toMatch(/^da+yum$/);
    expect(dayum.random(-30)).toMatch(/^da+yum$/);
  });
});
