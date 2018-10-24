import BufferUtil from './bufferUtil';

describe('BufferUtil class', () => {
  describe('createArrayBuffer function', () => {
    it('should create array buffer', () => {
      const mockText = 'Example string to encode';
      const actualData: ArrayBuffer = BufferUtil.createArrayBuffer(mockText);

      expect(actualData).toBeDefined();
      expect(String.fromCharCode.apply(null, new Uint16Array(actualData))).toEqual(mockText);
    });

    it('should create array buffer and fill to specified length', () => {
      const mockText = 'Example string to encode';
      const actualData: ArrayBuffer = BufferUtil.createArrayBuffer(mockText, 58);
      const actualText: string = String.fromCharCode.apply(null, new Uint16Array(actualData));

      expect(actualData).toBeDefined();
      expect(actualData.byteLength).toEqual(58);
      expect(actualText).toEqual(mockText + String.fromCharCode(0).repeat(5));
    });

    it('should throw an error if size of buffer is less than size of text', () => {
      const actualData = () => BufferUtil.createArrayBuffer('Short data', 2);

      expect(actualData).toThrowError('Buffer size cannot be less than size of text');
    });
  });

  describe('decodeArrayBuffer function', () => {
    it('should convert string from arrayBuffer', () => {
      const mockText = 'Example string to encode';
      const actualData: ArrayBuffer = BufferUtil.createArrayBuffer(mockText, mockText.length * 2);

      expect(BufferUtil.decodeArrayBuffer(actualData)).toEqual(mockText);
    });
  });

  describe('concatArrayBuffers function', () => {
    it('should return a combined arrayBuffer', () => {
      const arrBuff1: ArrayBuffer = BufferUtil.createArrayBuffer('Test 1', 14);
      const arrBuff2: ArrayBuffer = BufferUtil.createArrayBuffer('Test 2', 14);
      const arrBuff3: ArrayBuffer = BufferUtil.createArrayBuffer('Test 3', 14);
      const combinedUint: Uint16Array = <Uint16Array>(
        BufferUtil.concatTypedArrays(
          new Uint16Array(arrBuff1),
          new Uint16Array(arrBuff2),
          new Uint16Array(arrBuff3)
        )
      );

      expect(combinedUint.byteLength).toEqual(84);
      expect(BufferUtil.decodeTypedArray(combinedUint)).toEqual('');
    });
  });
});
