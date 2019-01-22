import BufferUtil from './bufferUtil';

describe('BufferUtil class', () => {
  describe('createArrayBuffer function', () => {
    it('should create array buffer from string', () => {
      const mockText = 'Example string to encode';
      const actualData: ArrayBuffer = BufferUtil.createArrayBuffer(mockText);

      expect(actualData).toBeDefined();
      expect(String.fromCharCode.apply(null, new Uint8Array(actualData))).toEqual(mockText);
    });

    it('should create array buffer from string and fill to specified length', () => {
      const mockText = 'Example string to encode';
      const actualData: ArrayBuffer = BufferUtil.createArrayBuffer(mockText, 36);
      const actualText: string = String.fromCharCode.apply(null, new Uint8Array(actualData));

      expect(actualData).toBeDefined();
      expect(actualData.byteLength).toEqual(36);
      expect(actualText).toEqual(mockText + String.fromCharCode(0).repeat(12));
    });

    it('should create array buffer from index and fill to specified length', () => {
      const mockNumber = 100;
      const actualData: ArrayBuffer = BufferUtil.createArrayBuffer(mockNumber);
      const actualNumber: number = BufferUtil.decodeArrayBufferFromNum(actualData);

      expect(actualData).toBeDefined();
      expect(actualNumber).toEqual(100);
    });
  });

  describe('decodeArrayBuffer function', () => {
    it('should convert arrayBuffer to string ', () => {
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

  describe('isBitSetAt function', () => {
    it('should return true if a bit is set at given position', () => {
      const dataView: DataView = new DataView(new ArrayBuffer(2));
      dataView.setUint8(0, 0);
      dataView.setUint8(1, 1);

      expect(BufferUtil.isBitSetAt(dataView, 0, 0)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 0, 1)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 0, 2)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 0, 3)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 0, 4)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 0, 5)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 0, 6)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 0, 7)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 0, 8)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 1, 0)).toBeTruthy();
      expect(BufferUtil.isBitSetAt(dataView, 1, 1)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 1, 2)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 1, 3)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 1, 4)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 1, 5)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 1, 6)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 1, 7)).toBeFalsy();
      expect(BufferUtil.isBitSetAt(dataView, 1, 8)).toBeFalsy();
    });
  });

  describe('setBitAt function', () => {
    it('should set a bit at given position', () => {
      let dataView: DataView = new DataView(new ArrayBuffer(2));

      dataView = BufferUtil.setBitAt(dataView, 0, 2);
      expect(dataView.getUint8(0)).toEqual(4);

      dataView = BufferUtil.setBitAt(dataView, 0, 0);
      expect(dataView.getUint8(0)).toEqual(5);
    });
  });
});
