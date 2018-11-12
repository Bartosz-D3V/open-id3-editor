import StringUtil from './stringUtil';

describe('StringUtil class', () => {
  describe('getByteAt method', () => {
    it('should return byte from the given index', () => {
      expect(StringUtil.getByteAt('1', 0)).toEqual(49);
      expect(StringUtil.getByteAt('s', 0)).toEqual(115);
      expect(StringUtil.getByteAt('a', 0)).toEqual(97);
      expect(StringUtil.getByteAt('$', 0)).toEqual(36);
    });
  });
});
