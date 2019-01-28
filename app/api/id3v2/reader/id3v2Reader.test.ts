import path from 'path';
import FsUtil from '@api/common/fs/fsUtil';
import Id3v2Reader from './id3v2Reader';
import ID3V23 from '../domain/2.3/id3v2';
import { FrameID } from '../domain/2.3/frameID';

const mp3Dir: string = path.resolve('./example_mp3');

describe('ID3V23Reader', () => {
  describe('readID3V23 function', () => {
    it('should create ID3V23 object from DataView from real MP3 file', async () => {
      const data1: Buffer = await FsUtil.readFile(`${mp3Dir}/ID3V20/id3v2_001_basic.mp3`);
      const dataView1: DataView = new DataView(data1.buffer);
      const id31: ID3V23 = Id3v2Reader.readID3V23(dataView1);
      expect(id31.body[0].frameID).toEqual('TALB');
      expect(id31.body[0].data).toEqual('Example album');
      expect(id31.body[1].frameID).toEqual('TPE2');
      expect(id31.body[1].data).toEqual('Example artist;');

      const data2: Buffer = await FsUtil.readFile(`${mp3Dir}/ID3V20/id3v2_002_genre.mp3`);
      const dataView2: DataView = new DataView(data2.buffer);
      const id32: ID3V23 = Id3v2Reader.readID3V23(dataView2);

      expect(id32.body[0].frameID).toEqual('TALB');
      expect(id32.body[0].data).toEqual('Example album');
      expect(id32.body[1].frameID).toEqual('TPE1');
      expect(id32.body[1].data).toEqual('Example artist');
      expect(id32.body[2].frameID).toEqual('TPE2');
      expect(id32.body[2].data).toEqual('Example artist');
      expect(id32.body[3].frameID).toEqual('COMM');
      expect(id32.body[3].data).toEqual('engExample comment');
      expect(id32.body[4].frameID).toEqual('TCOM');
      expect(id32.body[4].data).toEqual('Example composer');
      expect(id32.body[5].frameID).toEqual('TPOS');
      expect(id32.body[5].data).toEqual('12');
      expect(id32.body[6].frameID).toEqual('TCON');
      expect(id32.body[6].data).toEqual('Acoustic');
      expect(id32.body[7].frameID).toEqual('TIT2');
      expect(id32.body[7].data).toEqual('Example title');
      expect(id32.body[8].frameID).toEqual('TRCK');
      expect(id32.body[8].data).toEqual('12');
      expect(id32.body[9].frameID).toEqual('TYER');
      expect(id32.body[9].data).toEqual('2020');
    });
  });
});
