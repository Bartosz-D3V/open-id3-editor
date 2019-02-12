import path from 'path';
import FsUtil from '@api/common/fs/fsUtil';
import ID3V23 from '../domain/2.3/id3v2';
import ID3V2Reader from './id3v2Reader';

const mp3Dir: string = path.resolve('./example_mp3');

describe('ID3V2Reader', () => {
  describe('readID3V23 function', () => {
    it('should create ID3V2 object from real MP3 file', async () => {
      const data1: Buffer = await FsUtil.readFile(`${mp3Dir}/ID3V2/id3v2_001_basic.mp3`);
      const dataView1: DataView = new DataView(data1.buffer);
      const id31: ID3V23 = ID3V2Reader.readID3V23(dataView1);

      expect(id31.body[0].frameID).toEqual('TALB');
      expect(id31.body[0].data).toEqual('Example album');
      expect(id31.body[1].frameID).toEqual('TPE2');
      expect(id31.body[1].data).toEqual('Example artist;');

      const data2: Buffer = await FsUtil.readFile(`${mp3Dir}/ID3V2/id3v2_002_genre.mp3`);
      const dataView2: DataView = new DataView(data2.buffer);
      const id32: ID3V23 = ID3V2Reader.readID3V23(dataView2);

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

    it('should create ID3V2 object from real MP3 file with embedded picture', async () => {
      const data: Buffer = await FsUtil.readFile(`${mp3Dir}/ID3V2/id3v2_003_cover.mp3`);
      const dataView: DataView = new DataView(data.buffer);
      const id3: ID3V23 = ID3V2Reader.readID3V23(dataView);
      const apic: any = id3.body.find(v => v.frameID === 'APIC');

      expect(apic).toBeDefined();
      expect(apic.frameID).toEqual('APIC');
      expect(apic.size).toEqual(13932099);
      expect(apic.data.textEncoding).toEqual(0);
      expect(apic.data.mimeType).toEqual('image/jpeg');
      expect(apic.data.pictureType).toEqual(3);
      expect(apic.data.description).toEqual('');
      expect(apic.data.rawData).toBeDefined();
      expect(apic.data.rawData.length).toEqual(13932085);
    });
  });

  describe('readFrame size', () => {
    let mockView: DataView;

    beforeEach(() => {
      mockView = new DataView(new ArrayBuffer(5));
    });

    it('should convert DataView to encoded number', () => {
      mockView.setUint8(0, 1);
      mockView.setUint8(1, 10);
      mockView.setUint8(2, 20);
      mockView.setUint8(3, 30);

      expect(ID3V2Reader.readFrameSize(mockView)).toEqual(17437726);
    });

    it('should convert DataView to encoded number with smaller multiplier', () => {
      mockView.setUint8(0, 1);
      mockView.setUint8(1, 10);
      mockView.setUint8(2, 20);
      mockView.setUint8(3, 30);

      expect(ID3V2Reader.readFrameSize(mockView, 0, false)).toEqual(2263582);
    });

    it('should convert DataView to encoded number starting with custom offset', () => {
      mockView.setUint8(0, 1);
      mockView.setUint8(1, 10);
      mockView.setUint8(2, 20);
      mockView.setUint8(3, 30);
      mockView.setUint8(4, 40);

      expect(ID3V2Reader.readFrameSize(mockView, 1)).toEqual(169090600);
    });

    it('should convert DataView to encoded number starting with custom offset and smaller multiplier', () => {
      mockView.setUint8(0, 1);
      mockView.setUint8(1, 10);
      mockView.setUint8(2, 20);
      mockView.setUint8(3, 30);
      mockView.setUint8(4, 40);

      expect(ID3V2Reader.readFrameSize(mockView, 1, false)).toEqual(21303080);
    });
  });
});
