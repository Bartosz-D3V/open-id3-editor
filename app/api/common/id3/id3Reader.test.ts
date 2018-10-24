import BufferUtil from '../buffer/bufferUtil';

describe('id3Reader', () => {
  describe('readID3 function', () => {
    xit('should create ID3 object from DataView', () => {
      const title: DataView = new DataView(BufferUtil.createArrayBuffer('Example Title', 30));
      const artist: DataView = new DataView(BufferUtil.createArrayBuffer('Example Artist', 30));
      const album: DataView = new DataView(BufferUtil.createArrayBuffer('Example Album', 30));
      const year: DataView = new DataView(BufferUtil.createArrayBuffer(1997, 10));
      const comment: DataView = new DataView(BufferUtil.createArrayBuffer('Example Comment', 30));
      const zeroByte: DataView = new DataView(BufferUtil.createArrayBuffer(1, 1));
      const track: DataView = new DataView(BufferUtil.createArrayBuffer(12, 10));
      const genre: DataView = new DataView(BufferUtil.createArrayBuffer(7, 10));
    });
  });
});
