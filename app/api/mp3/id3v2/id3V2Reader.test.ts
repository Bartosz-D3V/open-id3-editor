import ID3V2 from './domain/id3V2';
import ID3V2Reader from './id3V2Reader';
import FsUtil from '../../common/fs/fsUtil';
import { FrameID } from './domain/frameID';
import BufferUtil from '../../common/buffer/bufferUtil';

describe('ID3V2Reader', () => {
  describe('readID3V2 function', () => {
    it('should create ID3V2 object from DataView from real MP3 file', async () => {
      const data1: Buffer = await FsUtil.readFile(`${__dirname}/mockID3Files/id3v2_001_basic.mp3`);
      const dataView1: DataView = new DataView(data1.buffer);
      const id31: ID3V2 = ID3V2Reader.readID3V2(dataView1);

      expect(id31.body[0].frame.frameID).toEqual(FrameID.TALB);
      expect(id31.body[0].data).toEqual('Example album');
      expect(id31.body[1].frame.frameID).toEqual(FrameID.TPE2);
      expect(id31.body[1].data).toEqual('Example artist;');

      const data2: Buffer = await FsUtil.readFile(`${__dirname}/mockID3Files/id3v2_002_genre.mp3`);
      const dataView2: DataView = new DataView(data2.buffer);
      const id32: ID3V2 = ID3V2Reader.readID3V2(dataView2);

      expect(id32.body[0].frame.frameID).toEqual(FrameID.TALB);
      expect(id32.body[0].data).toEqual('Example album');
      expect(id32.body[1].frame.frameID).toEqual(FrameID.TPE1);
      expect(id32.body[1].data).toEqual('Example artist');
      expect(id32.body[2].frame.frameID).toEqual(FrameID.TPE2);
      expect(id32.body[2].data).toEqual('Example artist');
      expect(id32.body[3].frame.frameID).toEqual(FrameID.COMM);
      expect(id32.body[3].data).toEqual('engExample comment');
      expect(id32.body[4].frame.frameID).toEqual(FrameID.TCOM);
      expect(id32.body[4].data).toEqual('Example composer');
      expect(id32.body[5].frame.frameID).toEqual(FrameID.TPOS);
      expect(id32.body[5].data).toEqual('12');
      expect(id32.body[6].frame.frameID).toEqual(FrameID.TCON);
      expect(id32.body[6].data).toEqual('Acoustic');
      expect(id32.body[7].frame.frameID).toEqual(FrameID.TIT2);
      expect(id32.body[7].data).toEqual('Example title');
      expect(id32.body[8].frame.frameID).toEqual(FrameID.TRCK);
      expect(id32.body[8].data).toEqual('12');
      expect(id32.body[9].frame.frameID).toEqual(FrameID.TYER);
      expect(id32.body[9].data).toEqual('2020');
    });

    it('should throw error if file is missing "TAG" header', () => {
      const invalidID3 = () =>
        ID3V2Reader.readID3V2(new DataView(BufferUtil.createArrayBuffer('Test', 128)));

      expect(invalidID3).toThrowError('Invalid MP3 file - ID3V2 tag is missing');
    });
  });
});
