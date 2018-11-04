import BufferUtil from '../buffer/bufferUtil';
import BlobUtil from '../blob/blobUtil';
import ID3V2 from './id3V2';
import ID3V2Reader from './id3V2Reader';
import FsUtil from '../fs/fsUtil';

describe('ID3V2Reader', () => {
  describe('readID3V2 function', () => {
    it('should create ID3V2 object from DataView from real MP3 file', async () => {
      const data1: Buffer = await FsUtil.readFile(`${__dirname}/mockID3Files/id3v2_001_basic.mp3`);
      const dataView1: DataView = new DataView(data1.buffer);
      const id31: ID3V2 = ID3V2Reader.readID3V2(dataView1);

      console.log(BlobUtil.dataViewToString(dataView1, 0, dataView1.byteLength));
    });
  });
});
