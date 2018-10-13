import BlobConverter from './blobConverter';
import { NodeStringDecoder, StringDecoder } from 'string_decoder';

describe('blobConverter class', () => {
  describe('blobToArrayBuffer function', () => {
    it('should convert blob to array buffer', async () => {
      const mockText = 'Hello, World!';
      const mockBlob: Blob = new Blob([mockText], {
        type: 'text/plain',
      });
      const stringDecoder: NodeStringDecoder = new StringDecoder();
      const actualArrayBuffer: ArrayBuffer = await BlobConverter.blobToArrayBuffer(mockBlob);
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
      const actualDataURL: string = await BlobConverter.blobToDataURL(mockBlob);
      const actualText: string = stringDecoder.write(Buffer.from(actualDataURL));

      expect(actualText).toBeDefined();
      expect(actualText).toEqual(mockDataURL);
    });
  });
});
