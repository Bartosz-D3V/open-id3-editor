import ID3V2Writer from '@api/id3v2/writer/id3v2Writer';
import Genre from '@api/id3/domain/genre';
import Id3v2Reader from '../reader/id3v2Reader';
import ID3V23 from '../domain/2.3/id3v2';
import ID3V23Frame from '../domain/2.3/id3v2Frame';
import ID3V23Header from '../domain/2.3/id3v2Header';
import ID3V23HeaderFlags from '../domain/2.3/id3v2HeaderFlags';
import ID3V23FrameFlags from '../domain/2.3/id3v2FrameFlags';

describe('ID3V2Writer', () => {
  describe('convertID3V23ToDataView function', () => {
    it('should convert full id3v23 to DataView', () => {
      const commData = 'Example comment';
      const toryData = '2000';
      const tlanData = 'English';
      const frame1: ID3V23Frame = new ID3V23Frame('COMM', new ID3V23FrameFlags(), commData);
      const frame2: ID3V23Frame = new ID3V23Frame('TORY', new ID3V23FrameFlags(), toryData);
      const frame3: ID3V23Frame = new ID3V23Frame('TLAN', new ID3V23FrameFlags(), tlanData);
      const body: Array<ID3V23Frame> = [frame1, frame2, frame3];
      const id3Header: ID3V23Header = new ID3V23Header(
        '23',
        new ID3V23HeaderFlags(),
        ID3V2Writer.calcV2HeaderSize(body, 4)
      );
      const id3v23: ID3V23 = new ID3V23(id3Header, body);
      const dataView: DataView = ID3V2Writer.convertID3V23ToDataView(id3v23);
      const id31: ID3V23 = Id3v2Reader.readID3V23(dataView);

      expect(id31.header.tagId).toEqual('ID3');
      expect(id31.header.size).toEqual(57);
      expect(id31.header.version).toEqual('23');
      expect(id31.header.flags.unsynchronisation).toBeFalsy();
      expect(id31.header.flags.experimental).toBeFalsy();
      expect(id31.header.flags.extendedHeader).toBeFalsy();
      expect(id31.body[0].frameID).toEqual('COMM');
      expect(id31.body[0].data).toEqual(commData);
      expect(id31.body[1].frameID).toEqual('TORY');
      expect(id31.body[1].data).toEqual(toryData);
      expect(id31.body[2].frameID).toEqual('TLAN');
      expect(id31.body[2].data).toEqual(tlanData);
    });
  });

  describe('encodeFrameSize function', () => {
    it('should encode number to format used by ID3 if size is zero or less', () => {
      let frameSize: DataView;

      frameSize = ID3V2Writer.encodeFrameSize(-10000);
      expect(Id3v2Reader.readFrameSize(frameSize)).toEqual(-10000);

      frameSize = ID3V2Writer.encodeFrameSize(-100);
      expect(Id3v2Reader.readFrameSize(frameSize)).toEqual(-100);

      frameSize = ID3V2Writer.encodeFrameSize(0);
      expect(Id3v2Reader.readFrameSize(frameSize)).toEqual(0);
    });

    it('should encode number to format used by ID3', () => {
      let frameSize: DataView;

      frameSize = ID3V2Writer.encodeFrameSize(1);
      expect(Id3v2Reader.readFrameSize(frameSize)).toEqual(1);

      frameSize = ID3V2Writer.encodeFrameSize(4);
      expect(Id3v2Reader.readFrameSize(frameSize)).toEqual(4);

      frameSize = ID3V2Writer.encodeFrameSize(14);
      expect(Id3v2Reader.readFrameSize(frameSize)).toEqual(14);

      frameSize = ID3V2Writer.encodeFrameSize(16);
      expect(Id3v2Reader.readFrameSize(frameSize)).toEqual(16);

      frameSize = ID3V2Writer.encodeFrameSize(31);
      expect(Id3v2Reader.readFrameSize(frameSize)).toEqual(31);

      frameSize = ID3V2Writer.encodeFrameSize(257);
      expect(Id3v2Reader.readFrameSize(frameSize)).toEqual(257);

      frameSize = ID3V2Writer.encodeFrameSize(306004);
      expect(Id3v2Reader.readFrameSize(frameSize)).toEqual(306004);

      frameSize = ID3V2Writer.encodeFrameSize(530772);
      expect(Id3v2Reader.readFrameSize(frameSize)).toEqual(530772);

      frameSize = ID3V2Writer.encodeFrameSize(6407721);
      expect(Id3v2Reader.readFrameSize(frameSize)).toEqual(6407721);
    });
  });

  it('calcV2HeaderSize should return size of the ID3 tag', () => {
    const frame1: ID3V23Frame = new ID3V23Frame('WCM', new ID3V23FrameFlags(), 'Test');
    const frame2: ID3V23Frame = new ID3V23Frame('XYZ', new ID3V23FrameFlags(), 'Test');
    const frame3: ID3V23Frame = new ID3V23Frame('ZYX', new ID3V23FrameFlags(), 'Test');

    expect(ID3V2Writer.calcV2HeaderSize([frame1, frame2, frame3], 3)).toEqual(40);
  });

  describe('writeGenres function', () => {
    it('should return empty string if there are no genres', () => {
      expect(ID3V2Writer.writeGenres([])).toEqual('');
    });

    it('should convert string of ID3V1 genres to array of genres', () => {
      const expectedGenres = '(1)(2)(21)(30)(51)';
      const mockGenres: Array<Genre> = [
        new Genre(1, 'Classic Rock'),
        new Genre(2, 'Country'),
        new Genre(21, 'Ska'),
        new Genre(30, 'Fusion'),
        new Genre(51, 'Techno-Industrial'),
      ];

      expect(ID3V2Writer.writeGenres(mockGenres)).toEqual(expectedGenres);
    });
  });
});
