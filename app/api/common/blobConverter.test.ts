import BlobConverter from './blobConverter';

describe('blobConverter class', () => {
  describe('blobToArrayBuffer function', () => {
    it('should convert blob to array buffer', () => {
      const mockText: string = 'Hello, World!';
      const mockBlob: Blob = new Blob([mockText], {
        type: 'text/plain',
      });
      const textDecoder: TextDecoder = new TextDecoder();
      const actualText: string = textDecoder.decode(BlobConverter.blobToArrayBuffer(mockBlob));

      expect(actualText).toBeDefined();
      expect(actualText).toEqual(mockText);
    });
  });
});
