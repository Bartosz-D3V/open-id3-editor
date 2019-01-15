import ID3V2FrameWrapper from '@api/id3v2/domain/id3V2FrameWrapper';
import BufferUtil from '@api/common/buffer/bufferUtil';
import { FrameID } from '@api/id3v2/domain/frameID';
import Id3Writer from '@api/id3v2/writer/id3Writer';
import ID3V2 from '@api/id3v2/domain/id3V2';
import ID3V2Reader from '@api/id3v2/reader/id3V2Reader';
import ID3V2Header from '../domain/id3V2Header';
import ID3V2Frame from '../domain/id3V2Frame';
import ID3V20 from '../domain/id3V2';

describe('ID3Writer', () => {
  // describe('convertID3V20ToDataView function', () => {
  //   it('should convert full ID3V20 to DataView', () => {
  //     const frame1Data: ArrayBuffer = BufferUtil.createArrayBuffer('Example comment');
  //     const frame1Size: number = BufferUtil.getBufferSize(frame1Data);
  //     const frame1: ID3V2Frame = new ID3V2Frame(FrameID.COMM, frame1Size, '000000');
  //     const id3Header: ID3V2Header = new ID3V2Header('20', '00', frame1Size);
  //     const id3FrameWrapper1: ID3V2FrameWrapper = new ID3V2FrameWrapper(frame1, 'Example Comment');
  //     const body: Array<ID3V2FrameWrapper> = [id3FrameWrapper1];
  //     const id3v20: ID3V20 = new ID3V20(id3Header, body);

  //     const dataView: DataView = Id3Writer.convertID3V20ToDataView(id3v20);
  //     const id31: ID3V2 = ID3V2Reader.readID3V20(dataView);

  //     expect(id31.body[0].frame.frameID).toEqual(FrameID.COMM);
  //     expect(id31.body[0].data).toEqual('Example comment');
  //   });
  // });

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
