const dayum = require('..');

describe('dayum', () => {
  it('generates a two-syllable damn', () => {
    expect(dayum()).toBe('dayum');
    expect(dayum(2)).toBe('daayum');
    expect(dayum(4)).toBe('daaaayum');
    expect(dayum(-1)).toBe('dayum');
  });
});
