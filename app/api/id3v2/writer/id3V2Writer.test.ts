import ID3V2Writer from '@api/id3v2/writer/id3V2Writer';
import ID3V22 from '../domain/2.2/id3V2';
import ID3V2Reader from '../reader/id3V2Reader';
import ID3V22Flags from '../domain/2.2/id3v2Flags';
import ID3V22Header from '../domain/2.2/id3V2Header';
import ID3V22Frame from '../domain/2.2/id3V2Frame';

describe('ID3V2Writer', () => {
  describe('convertID3V22ToDataView function', () => {
    it('should convert full id3v22 to DataView', () => {
      const wcmData = 'Example comment';
      const torData = '2000';
      const frame1: ID3V22Frame = new ID3V22Frame('WCM', wcmData);
      const frame2: ID3V22Frame = new ID3V22Frame('TOR', torData);
      const body: Array<ID3V22Frame> = [frame1, frame2];
      const id3Header: ID3V22Header = new ID3V22Header(
        '20',
        new ID3V22Flags(),
        ID3V2Writer.calcHeaderSize(body)
      );
      const id3v22: ID3V22 = new ID3V22(id3Header, body);
      const dataView: DataView = ID3V2Writer.convertID3V22ToDataView(id3v22);
      const id31: ID3V22 = ID3V2Reader.readID3V22(dataView);

      expect(id31.header.tagId).toEqual('ID3');
      expect(id31.header.size).toEqual(35);
      expect(id31.header.version).toEqual('20');
      expect(id31.header.flags.compression).toBeFalsy();
      expect(id31.header.flags.unsynchronisation).toBeFalsy();
      expect(id31.body[0].frameID).toEqual('WCM');
      expect(id31.body[0].data).toEqual('Example comment');
      expect(id31.body[1].frameID).toEqual('TOR');
      expect(id31.body[1].data).toEqual('2000');
    });
  });

  describe('encodeFrameSize function', () => {
    it('should encode number to format used by ID3 if size is zero or less', () => {
      let frameSize: DataView;

      frameSize = ID3V2Writer.encodeFrameSize(-10000);
      expect(ID3V2Reader.readFrameSize(frameSize)).toEqual(-10000);

      frameSize = ID3V2Writer.encodeFrameSize(-100);
      expect(ID3V2Reader.readFrameSize(frameSize)).toEqual(-100);

      frameSize = ID3V2Writer.encodeFrameSize(0);
      expect(ID3V2Reader.readFrameSize(frameSize)).toEqual(0);
    });

    it('should encode number to format used by ID3', () => {
      let frameSize: DataView;

      frameSize = ID3V2Writer.encodeFrameSize(1);
      expect(ID3V2Reader.readFrameSize(frameSize)).toEqual(1);

      frameSize = ID3V2Writer.encodeFrameSize(14);
      expect(ID3V2Reader.readFrameSize(frameSize)).toEqual(14);

      frameSize = ID3V2Writer.encodeFrameSize(16);
      expect(ID3V2Reader.readFrameSize(frameSize)).toEqual(16);

      frameSize = ID3V2Writer.encodeFrameSize(31);
      expect(ID3V2Reader.readFrameSize(frameSize)).toEqual(31);

      frameSize = ID3V2Writer.encodeFrameSize(257);
      expect(ID3V2Reader.readFrameSize(frameSize)).toEqual(257);

      frameSize = ID3V2Writer.encodeFrameSize(306004);
      expect(ID3V2Reader.readFrameSize(frameSize)).toEqual(306004);

      frameSize = ID3V2Writer.encodeFrameSize(530772);
      expect(ID3V2Reader.readFrameSize(frameSize)).toEqual(530772);

      frameSize = ID3V2Writer.encodeFrameSize(6407721);
      expect(ID3V2Reader.readFrameSize(frameSize)).toEqual(6407721);
    });
  });

  it('calcHeaderSize should return size of the ID3 tag', () => {
    const frame1: ID3V22Frame = new ID3V22Frame('WCM', 'Test');
    const frame2: ID3V22Frame = new ID3V22Frame('XYZ', 'Test');
    const frame3: ID3V22Frame = new ID3V22Frame('ZYX', 'Test');

    expect(ID3V2Writer.calcHeaderSize([frame1, frame2, frame3])).toEqual(31);
  });
});
