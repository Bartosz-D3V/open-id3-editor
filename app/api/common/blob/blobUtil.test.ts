import BlobUtil from './blobUtil';
import { NodeStringDecoder, StringDecoder } from 'string_decoder';
import BufferUtil from '../buffer/bufferUtil';

describe('blobConverter class', () => {
  describe('blobToArrayBuffer function', () => {
    it('should convert blob to array buffer', async () => {
      const mockText = 'Hello, World!';
      const mockBlob: Blob = new Blob([mockText], {
        type: 'text/plain',
      });
      const stringDecoder: NodeStringDecoder = new StringDecoder();
      const actualArrayBuffer: ArrayBuffer = await BlobUtil.blobToArrayBuffer(mockBlob);
      const actualText: string = stringDecoder.write(Buffer.from(actualArrayBuffer));

      expect(actualText).toBeDefined();
      expect(actualText).toEqual(mockText);
    });
  });

  describe('blobToDataURL function', async () => {
    it('should convert blob to data URL', async () => {
      const mockDataURL = 'data:text/plain;charset=undefined,Hello%2C%20World!';
      const mockBlob: Blob = new Blob(['Hello, World!'], {
        type: 'text/plain',
      });
      const stringDecoder: NodeStringDecoder = new StringDecoder();
      const actualDataURL: string = await BlobUtil.blobToDataURL(mockBlob);
      const actualText: string = stringDecoder.write(Buffer.from(actualDataURL));

      expect(actualText).toBeDefined();
      expect(actualText).toEqual(mockDataURL);
    });
  });

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

  describe('dataViewToNum function', () => {
    it('should convert dataView to number', () => {
      const buff: ArrayBuffer = new ArrayBuffer(16);
      const mockView: DataView = new DataView(buff);
      mockView.setInt8(0, 123);

      expect(BlobUtil.dataViewToNum(mockView, 0)).toEqual(123);
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

  describe('decodeDataURL function', () => {
    it('should decode data URL from Base 64', () => {
      const encodedDataURL = 'data:text/plain;charset=utf-8;base64,SGVsbG8sIFdvcmxkIQ==';
      const expectedDataURL = 'Hello, World!';

      const actualDataURL = BlobUtil.decodeDataURL(encodedDataURL);

      expect(actualDataURL).toBeDefined();
      expect(actualDataURL).toEqual(expectedDataURL);
    });

    it('should throw an error if contains corrupted Base64 data', () => {
      const encodedDataURL = 'data:text/plain;charset=utf-8;base64,S%VsbG8sIFdvcmxkIQ==';

      const actualData = () => BlobUtil.decodeDataURL(encodedDataURL);

      expect(actualData).toThrowError('Incorrect Base64 encoding');
    });
  });
});
