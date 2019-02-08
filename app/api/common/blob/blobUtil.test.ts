import { NodeStringDecoder, StringDecoder } from 'string_decoder';
import BlobUtil from './blobUtil';
import BufferUtil from '../buffer/bufferUtil';

describe('blobConverter class', () => {
  describe('blobToDataView function', async () => {
    it('should convert blob to dataView', async () => {
      const mockBlob: Blob = new Blob(['Hello, World!'], {
        type: 'text/plain',
      });
      const actualDataView: DataView = await BlobUtil.blobToDataView(mockBlob);

      expect(actualDataView).toBeDefined();
    });
  });

  describe('dataViewToString function', async () => {
    it('should convert dataView to string', async () => {
      const mockText = 'Hello, World!';
      const mockBlob: Blob = new Blob([mockText], {
        type: 'text/plain',
      });
      const dataView: DataView = await BlobUtil.blobToDataView(mockBlob);
      const actualString: string = BlobUtil.dataViewToString(dataView, 0, dataView.byteLength);

      expect(actualString).toBeDefined();
      expect(actualString).toEqual(mockText);
    });
  });

  describe('getTextTerminatedByCharCode function', () => {
    it('should read string unless specific char is encountered', () => {
      const mockTxt: ArrayBuffer = BufferUtil.createArrayBuffer('Hello world', 14);
      const mockDataView: DataView = new DataView(mockTxt);
      mockDataView.setInt8(mockDataView.byteLength - 3, 0);
      mockDataView.setInt8(mockDataView.byteLength - 2, 31);
      mockDataView.setInt8(mockDataView.byteLength - 1, 100);

      expect(BlobUtil.getTextTerminatedByCharCode(mockDataView, 0, 0)).toEqual('Hello world');
    });
  });

  describe('writeToDataView function', () => {
    it('should write string to dataView', () => {
      const mockTxt = 'Example string';
      const buff: ArrayBuffer = new ArrayBuffer(60);
      const view: DataView = new DataView(buff);
      let updatedView: DataView = BlobUtil.writeToDataView(view, mockTxt, 0);
      updatedView = BlobUtil.writeToDataView(view, mockTxt, 14);
      const actualText1: string = BlobUtil.dataViewToString(updatedView, 0, 14);
      const actualText2: string = BlobUtil.dataViewToString(updatedView, 14, 28);

      expect(actualText1).toEqual(mockTxt);
      expect(actualText2).toEqual(mockTxt);
      expect(updatedView.byteLength).toEqual(60);
    });

    it('should write string to dataView from given offset', () => {
      const mockTxt = 'Example string';
      const buff: ArrayBuffer = new ArrayBuffer(30);
      const view: DataView = new DataView(buff);
      const updatedView: DataView = BlobUtil.writeToDataView(view, mockTxt, 10);
      const actualText: string = BlobUtil.dataViewToString(updatedView, 0, updatedView.byteLength);

      expect(actualText).toEqual(mockTxt);
      expect(updatedView.byteLength).toEqual(30);
      expect(BlobUtil.dataViewToString(updatedView, 0, 10)).toEqual('');
    });

    it('should write index to dataView', () => {
      const buff: ArrayBuffer = new ArrayBuffer(20);
      const view: DataView = new DataView(buff);
      let updatedView: DataView = BlobUtil.writeToDataView(view, 100, 0);
      updatedView = BlobUtil.writeToDataView(view, 124, 1);
      updatedView = BlobUtil.writeToDataView(view, 127, 2);

      expect(updatedView.byteLength).toEqual(20);
      expect(BlobUtil.dataViewToNum(updatedView, 0)).toEqual(100);
      expect(BlobUtil.dataViewToNum(updatedView, 1)).toEqual(124);
      expect(BlobUtil.dataViewToNum(updatedView, 2)).toEqual(127);
    });
  });

  describe('dataViewToNum function', () => {
    it('should convert dataView to index', () => {
      const buff: ArrayBuffer = new ArrayBuffer(16);
      const mockView: DataView = new DataView(buff);
      mockView.setInt8(0, 123);

      expect(BlobUtil.dataViewToNum(mockView, 0)).toEqual(123);
    });
  });

  describe('stringToUint8 function', () => {
    it('should return UInt8 array of UTF-8 characters', () => {
      const text = 'This is an example sentence.';
      const arr: Uint8Array = BlobUtil.stringToUint8(text);
      const stringDecoder: NodeStringDecoder = new StringDecoder();
      const actualText: string = stringDecoder.write(Buffer.from(arr));

      expect(actualText).toEqual(text);
    });
  });

  describe('concatDataViews function', () => {
    it('should concatenate array of DataViews', () => {
      const buff1: ArrayBuffer = BufferUtil.createArrayBuffer('Test 1');
      const dataView1: DataView = new DataView(buff1);
      const buff2: ArrayBuffer = BufferUtil.createArrayBuffer('Test 2');
      const dataView2: DataView = new DataView(buff2);

      const concatDataView = BlobUtil.concatDataViews(dataView1, dataView2);
      expect(concatDataView.byteLength).toEqual(12);
      expect(Buffer.from(concatDataView.buffer).toString()).toContain('Test 1');
      expect(Buffer.from(concatDataView.buffer).toString()).toContain('Test 2');
    });
  });
});
