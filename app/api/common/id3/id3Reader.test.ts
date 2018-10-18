import BlobUtil from '../blob/blobUtil';

describe('id3Reader', () => {
  describe('readID3 function', () => {
    it('should create ID3 object from DataView', () => {
      const title: DataView = new DataView(BlobUtil.createArrayBuffer('Example Artist'), 3, 30);
    });
  });
});
