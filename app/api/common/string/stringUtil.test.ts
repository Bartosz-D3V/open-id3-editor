import StringUtil from './stringUtil';

describe('StringUtil class', () => {
  describe('getByteAt method', () => {
    it('should return byte from the given index', () => {
      expect(StringUtil.getByteAt('A', 2)).toEqual(0);
      expect(StringUtil.getByteAt('1', 0)).toEqual(49);
      expect(StringUtil.getByteAt('Test', 2)).toEqual(115);
      expect(StringUtil.getByteAt('alpha', 0)).toEqual(97);
      expect(StringUtil.getByteAt('JqueryUses$CharHeavily', 10)).toEqual(36);
    });
  });
});
