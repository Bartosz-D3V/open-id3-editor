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
});
