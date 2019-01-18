import ID3V2FrameWrapper from '@api/id3v2/domain/2.3/id3V2FrameWrapper';
import BufferUtil from '@api/common/buffer/bufferUtil';
import { FrameID as FrameV23ID } from '@api/id3v2/domain/2.2/frameID';
import Id3Writer from '@api/id3v2/writer/id3Writer';
import ID3V22 from '@api/id3v2/domain/2.2/id3V2';
import ID3V23 from '@api/id3v2/domain/2.3/id3V2';
import ID3V2Reader from '@api/id3v2/reader/id3V2Reader';
import ID3V2Header from '../domain/2.3/id3V2Header';
import ID3V2Frame from '../domain/2.3/id3V2Frame';
import Id3v22 from '../domain/2.2/id3V2';
import Id3v2Flags from '@api/id3v2/domain/2.3/id3v2Flags';

describe('ID3Writer', () => {
  describe('convertID3V22ToDataView function', () => {
    it('should convert full id3v23 to DataView', () => {
      const frame1Data: ArrayBuffer = BufferUtil.createArrayBuffer('Example comment');
      const frame1Size: number = BufferUtil.getBufferSize(frame1Data);
      const frame1: ID3V2Frame = new ID3V2Frame('WCM', frame1Size, new Id3v2Flags());
      const id3Header: ID3V2Header = new ID3V2Header('20', new Id3v2Flags(), frame1Size);
      const id3FrameWrapper1: ID3V2FrameWrapper = new ID3V2FrameWrapper(frame1, 'Example Comment');
      const body: Array<ID3V2FrameWrapper> = [id3FrameWrapper1];
      const id3v22: Id3v22 = new Id3v22(id3Header, body);
      const dataView: DataView = Id3Writer.convertID3V22ToDataView(id3v22);
      const id31: ID3V22 = ID3V2Reader.readID3V22(dataView);

      expect(id31.body[0].frame.frameID).toEqual(FrameV23ID.WCM);
      expect(id31.body[0].data).toEqual('Example comment');
    });
  });

  describe('encodeFrameSize function', () => {
    it('should return 0000 if size is zero or less', () => {
      expect(Id3Writer.encodeFrameSize(-10000)).toEqual('0000');
      expect(Id3Writer.encodeFrameSize(-10)).toEqual('0000');
      expect(Id3Writer.encodeFrameSize(0)).toEqual('0000');
    });

    it('should encode number to format used by ID3', () => {
      expect(Id3Writer.encodeFrameSize(1)).toEqual('0001');
      expect(Id3Writer.encodeFrameSize(257)).toEqual('0021');
      expect(Id3Writer.encodeFrameSize(530772)).toEqual('0325084');
      expect(Id3Writer.encodeFrameSize(306004)).toEqual('0188684');
      expect(Id3Writer.encodeFrameSize(500307721)).toEqual('23872469');
    });
  });
});
