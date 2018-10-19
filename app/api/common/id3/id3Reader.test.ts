import BlobUtil from '../blob/blobUtil';

describe('id3Reader', () => {
  describe('readID3 function', () => {
    xit('should create ID3 object from DataView', () => {
      const title: DataView = new DataView(BlobUtil.createArrayBuffer('Example Title', 30), 3, 30);
    });
  });
});
