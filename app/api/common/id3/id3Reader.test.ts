import BufferUtil from '../buffer/bufferUtil';
import BlobUtil from '../blob/blobUtil';
import ID3 from './id3';
import Id3Reader from './id3Reader';

describe('id3Reader', () => {
  describe('readID3 function', () => {
    it('should create ID3 object from DataView', () => {
      const header: DataView = new DataView(BufferUtil.createArrayBuffer('TAG', 3));
      const title: DataView = new DataView(BufferUtil.createArrayBuffer('Example Title', 30));
      const artist: DataView = new DataView(BufferUtil.createArrayBuffer('Example Artist', 30));
      const album: DataView = new DataView(BufferUtil.createArrayBuffer('Example Album', 30));
      const year: DataView = new DataView(BufferUtil.createArrayBuffer(1997, 4));
      const comment: DataView = new DataView(BufferUtil.createArrayBuffer('Example Comment', 28));
      const zeroByte: DataView = new DataView(BufferUtil.createArrayBuffer(1, 1));
      const track: DataView = new DataView(BufferUtil.createArrayBuffer('12', 1));
      const genre: DataView = new DataView(BufferUtil.createArrayBuffer(7, 1));
      const id3DataView: DataView = BlobUtil.concatDataViews(
        header,
        title,
        artist,
        album,
        year,
        comment,
        zeroByte,
        track,
        genre
      );

      const id3: ID3 = Id3Reader.readID3(id3DataView);
      expect(id3.header).toEqual('TAG');
      expect(id3.title).toContain('Example Title');
      expect(id3.artist).toContain('Example Artist');
      expect(id3.album).toContain('Example Album');
      expect(id3.year).toEqual(1997);
      expect(id3.comment).toContain('Example Comment');
      expect(id3.zeroByte).toBeTruthy();
      expect(id3.track).toEqual('12');
      expect(id3.genre).toEqual(7);
    });
  });
});
