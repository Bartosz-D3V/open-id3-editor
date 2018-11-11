import ID3V2 from './id3V2';
import ID3V2Reader from './id3V2Reader';
import FsUtil from '../fs/fsUtil';
import { FrameID } from './frameID';

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
    });
  });
});
