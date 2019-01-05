import path from 'path';
import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import FsUtil from '@api/common/fs/fsUtil';
import ID3V11 from '../domain/id3V1-1';
import ID3V10 from '../domain/id3V1-0';
import ID3Reader from './id3Reader';

const mp3Dir: string = path.resolve('./example_mp3');

describe('id3V1Reader', () => {
  describe('readID3V11 function', () => {
    it('should create ID3V1.0 object from DataView', () => {
      const header: DataView = new DataView(BufferUtil.createArrayBuffer('TAG', 3));
      const title: DataView = new DataView(BufferUtil.createArrayBuffer('Example Title', 30));
      const artist: DataView = new DataView(BufferUtil.createArrayBuffer('Example Artist', 30));
      const album: DataView = new DataView(BufferUtil.createArrayBuffer('Example Album', 30));
      const year: DataView = new DataView(BufferUtil.createArrayBuffer('1997', 4));
      const comment: DataView = new DataView(BufferUtil.createArrayBuffer('Example Comment', 30));
      const genre: DataView = new DataView(BufferUtil.createArrayBuffer(7, 1));
      const id3DataView: DataView = BlobUtil.concatDataViews(
        header,
        title,
        artist,
        album,
        year,
        comment,
        genre
      );

      const id3: ID3V10 = ID3Reader.readID3V10(id3DataView);
      expect(id3.header).toEqual('TAG');
      expect(id3.title).toContain('Example Title');
      expect(id3.artist).toContain('Example Artist');
      expect(id3.album).toContain('Example Album');
      expect(id3.year).toEqual(1997);
      expect(id3.comment).toContain('Example Comment');
      expect(id3.genre.index).toEqual(7);
      expect(id3.genre.description).toEqual('Hip-Hop');
    });

    it('should create ID3V1.0 object from DataView from real MP3 file', async () => {
      const data1: Buffer = await FsUtil.readFile(`${mp3Dir}/ID3V10/id3v1_004_basic.mp3`);
      const dataView1: DataView = new DataView(data1.buffer);
      const id31: ID3V10 = ID3Reader.readID3V10(dataView1);

      expect(id31.header).toEqual('TAG');
      expect(id31.year).toEqual(2003);
      expect(id31.genre.index).toEqual(0);
      expect(id31.genre.description).toEqual('Blues');

      const data2: Buffer = await FsUtil.readFile(`${mp3Dir}/ID3V10/id3v1_018_genre.mp3`);
      const dataView2: DataView = new DataView(data2.buffer);
      const id32: ID3V11 = ID3Reader.readID3V11(dataView2);

      expect(id32.header).toEqual('TAG');
      expect(id32.title).toEqual('Dance');
      expect(id32.year).toEqual(2003);
      expect(id32.genre.index).toEqual(3);
      expect(id32.genre.description).toEqual('Dance');
    });
  });

  describe('readID3V11 function', () => {
    it('should create ID3V1.1 object from DataView', () => {
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

      const id3: ID3V11 = ID3Reader.readID3V11(id3DataView);
      expect(id3.header).toEqual('TAG');
      expect(id3.title).toContain('Example Title');
      expect(id3.artist).toContain('Example Artist');
      expect(id3.album).toContain('Example Album');
      expect(id3.year).toEqual(1997);
      expect(id3.comment).toContain('Example Comment');
      expect(id3.zeroByte).toBeTruthy();
      expect(id3.track).toEqual(12);
      expect(id3.genre.index).toEqual(7);
      expect(id3.genre.description).toEqual('Hip-Hop');
    });

    it('should create ID3V1.1 object from DataView from real MP3 file', async () => {
      const data1: Buffer = await FsUtil.readFile(`${mp3Dir}/ID3V10/id3v1_004_basic.mp3`);
      const dataView1: DataView = new DataView(data1.buffer);
      const id31: ID3V11 = ID3Reader.readID3V11(dataView1);

      expect(id31.header).toEqual('TAG');
      expect(id31.year).toEqual(2003);
      expect(id31.genre.index).toEqual(0);
      expect(id31.genre.description).toEqual('Blues');

      const data2: Buffer = await FsUtil.readFile(`${mp3Dir}/ID3V10/id3v1_018_genre.mp3`);
      const dataView2: DataView = new DataView(data2.buffer);
      const id32: ID3V11 = ID3Reader.readID3V11(dataView2);

      expect(id32.header).toEqual('TAG');
      expect(id32.title).toEqual('Dance');
      expect(id32.year).toEqual(2003);
      expect(id32.genre.index).toEqual(3);
      expect(id32.genre.description).toEqual('Dance');
    });
  });
});
