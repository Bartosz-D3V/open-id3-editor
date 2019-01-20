import ID3V2Writer from '@api/id3v2/writer/id3V2Writer';
import ID3V22 from '../domain/2.2/id3V2';
import ID3V2Reader from '../reader/id3V2Reader';
import ID3V2Flags from '../domain/2.3/id3v2Flags';
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
        new ID3V2Flags(),
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
    it('should return 0000 if size is zero or less', () => {
      expect(ID3V2Writer.encodeFrameSize(-10000)).toEqual(0);
      expect(ID3V2Writer.encodeFrameSize(-10)).toEqual(0);
      expect(ID3V2Writer.encodeFrameSize(0)).toEqual(0);
    });

    it('should encode number to format used by ID3', () => {
      expect(ID3V2Writer.encodeFrameSize(1)).toEqual(1);
      expect(ID3V2Writer.encodeFrameSize(14)).toEqual(14);
      expect(ID3V2Writer.encodeFrameSize(16)).toEqual(16);
      expect(ID3V2Writer.encodeFrameSize(31)).toEqual(31);
      expect(ID3V2Writer.encodeFrameSize(257)).toEqual(21);
      expect(ID3V2Writer.encodeFrameSize(306004)).toEqual(188684);
      expect(ID3V2Writer.encodeFrameSize(530772)).toEqual(325084);
      expect(ID3V2Writer.encodeFrameSize(500307721)).toEqual(23872469);
    });
  });

  it('calcHeaderSize should return size of the ID3 tag', () => {
    const frame1: ID3V22Frame = new ID3V22Frame('WCM', 'Test');
    const frame2: ID3V22Frame = new ID3V22Frame('XYZ', 'Test');
    const frame3: ID3V22Frame = new ID3V22Frame('ZYX', 'Test');

    expect(ID3V2Writer.calcHeaderSize([frame1, frame2, frame3])).toEqual(31);
  });
});
