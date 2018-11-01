import BufferUtil from '../buffer/bufferUtil';
import BlobUtil from '../blob/blobUtil';
import ID3 from './id3';
import Id3Reader from './id3Reader';
import FsUtil from '../fs/fsUtil';

describe('id3Reader', () => {
  describe('readID3 function', () => {
    it('should create ID3 object from DataView', () => {
      const header: DataView = new DataView(BufferUtil.createArrayBuffer('TAG', 3));
      const title: DataView = new DataView(BufferUtil.createArrayBuffer('Example Title', 30));
      const artist: DataView = new DataView(BufferUtil.createArrayBuffer('Example Artist', 30));
      const album: DataView = new DataView(BufferUtil.createArrayBuffer('Example Album', 30));
      const year: DataView = new DataView(BufferUtil.createArrayBuffer('1997', 4));
      const comment: DataView = new DataView(BufferUtil.createArrayBuffer('Example Comment', 28));
      const zeroByte: DataView = new DataView(BufferUtil.createArrayBuffer('1', 1));
      const track: DataView = new DataView(BufferUtil.createArrayBuffer(12, 1));
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
      expect(id3.track).toEqual(12);
      expect(id3.genre).toEqual(7);
    });

    it('should create ID3 object from DataView from real MP3 file where tag is in the beginning', async () => {
      const data1: Buffer = await FsUtil.readFile(`${__dirname}/mockID3Files/id3v1_004_basic.mp3`);
      const dataView1: DataView = new DataView(data1.buffer);
      const id31: ID3 = Id3Reader.readID3(dataView1);

      expect(id31.header).toEqual('TAG');
      expect(id31.year).toEqual(2003);
      expect(id31.genre).toEqual(0);

      const data2: Buffer = await FsUtil.readFile(`${__dirname}/mockID3Files/id3v1_018_genre.mp3`);
      const dataView2: DataView = new DataView(data2.buffer);
      const id32: ID3 = Id3Reader.readID3(dataView2);

      expect(id32.header).toEqual('TAG');
      expect(id32.title).toEqual('Dance');
      expect(id32.year).toEqual(2003);
      expect(id32.genre).toEqual(3);
    });

    it('should create ID3 object from DataView from real MP3 file where tag is in the end', async () => {
      const data1: Buffer = await FsUtil.readFile(`${__dirname}/mockID3Files/id3v2_001_basic.mp3`);
      const dataView1: DataView = new DataView(data1.buffer);
      const id31: ID3 = Id3Reader.readID3(dataView1);

      expect(id31.header).toEqual('TAG');
      expect(id31.year).toEqual(2003);
      expect(id31.genre).toEqual(0);
    });
  });
});
