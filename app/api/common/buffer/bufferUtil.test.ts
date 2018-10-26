import BufferUtil from './bufferUtil';
import { O_TRUNC } from 'constants';

describe('BufferUtil class', () => {
  describe('createArrayBuffer function', () => {
    it('should create array buffer', () => {
      const mockText = 'Example string to encode';
      const actualData: ArrayBuffer = BufferUtil.createArrayBuffer(mockText);

      expect(actualData).toBeDefined();
      expect(String.fromCharCode.apply(null, new Uint8Array(actualData))).toEqual(mockText);
    });

    it('should create array buffer and fill to specified length', () => {
      const mockText = 'Example string to encode';
      const actualData: ArrayBuffer = BufferUtil.createArrayBuffer(mockText, 36);
      const actualText: string = String.fromCharCode.apply(null, new Uint8Array(actualData));

      expect(actualData).toBeDefined();
      expect(actualData.byteLength).toEqual(36);
      expect(actualText).toEqual(mockText + String.fromCharCode(0).repeat(12));
    });
  });

  describe('decodeArrayBuffer function', () => {
    it('should convert string from arrayBuffer', () => {
      const mockText = 'Example string to encode';
      const actualData: ArrayBuffer = BufferUtil.createArrayBuffer(mockText, mockText.length * 2);

      expect(BufferUtil.decodeArrayBuffer(actualData)).toEqual(
        mockText + String.fromCharCode(0).repeat(24)
      );
    });
  });

  describe('concatArrayBuffers function', () => {
    it('should return a combined arrayBuffer', () => {
      const arrBuff1: ArrayBuffer = BufferUtil.createArrayBuffer('Test 1', 14);
      const arrBuff2: ArrayBuffer = BufferUtil.createArrayBuffer('Test 2', 14);
      const arrBuff3: ArrayBuffer = BufferUtil.createArrayBuffer('Test 3', 14);
      const combinedUint: Uint8Array = <Uint8Array>(
        BufferUtil.concatTypedArrays(
          new Uint8Array(arrBuff1),
          new Uint8Array(arrBuff2),
          new Uint8Array(arrBuff3)
        )
      );

      expect(combinedUint.byteLength).toEqual(42);
      expect(BufferUtil.decodeTypedArray(combinedUint)).toContain('Test 1');
      expect(BufferUtil.decodeTypedArray(combinedUint)).toContain('Test 2');
      expect(BufferUtil.decodeTypedArray(combinedUint)).toContain('Test 3');
    });
  });

  describe('getBufferSize function', () => {
    it('should return total size of the ArrayBuffers', () => {
      const buff1: ArrayBuffer = new ArrayBuffer(20);
      const buff2: ArrayBuffer = new ArrayBuffer(25);

      expect(BufferUtil.getBufferSize(buff1, buff2)).toEqual(45);
    });
  });

  describe('getTypedArrSize function', () => {
    it('should return total size of the TypedArray', () => {
      const arr1: Uint8Array = new Uint8Array(20);
      const arr2: Uint8Array = new Uint8Array(25);

      expect(BufferUtil.getTypedArrSize(arr1, arr2)).toEqual(45);
    });
  });
});
