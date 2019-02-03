import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import Id3Reader from '@api/id3v1/reader/id3Reader';
import Genre from '@api/id3/domain/genre';
import ID3V23 from '../domain/2.3/id3v2';
import ID3V23Frame from '../domain/2.3/id3v2Frame';
import ID3V2HeaderFlags from '../domain/2.3/id3v2HeaderFlags';
import ID3V2FrameFlags from '../domain/2.3/id3v2FrameFlags';
import ID3V23Header from '../domain/2.3/id3v2Header';
import ID3V23ExtendedHeader from '../domain/2.3/id3v2ExtendedHeader';
import Id3v2ExtendedHeaderFlags from '../domain/2.3/id3v2ExtendedHeaderFlags';

export default class Id3v2Reader {
  public static readID3V23(dataView: DataView): ID3V23 {
    const header: ID3V23Header = Id3v2Reader.readHeader(dataView);
    const {
      size,
      flags: { extendedHeader },
    } = header;
    let additionalHeader: ID3V23ExtendedHeader;
    if (extendedHeader) {
      additionalHeader = Id3v2Reader.readExtendedHeader(dataView, 10);
    }
    const data: Array<ID3V23Frame> = [];
    let i = extendedHeader ? additionalHeader.size + 10 : 10;
    while (i < size) {
      const frame: ID3V23Frame = Id3v2Reader.readFrame(dataView, i);
      data.push(frame);
      i += frame.size + 10;
    }
    return new ID3V23(header, data, additionalHeader);
  }

  private static readHeader(dataView: DataView): ID3V23Header {
    const version: string = BlobUtil.dataViewToString(dataView, 3, 2);
    const unsynchronization: boolean = BufferUtil.isBitSetAt(dataView, 5, 8);
    const extenderHeader: boolean = BufferUtil.isBitSetAt(dataView, 5, 7);
    const experimental: boolean = BufferUtil.isBitSetAt(dataView, 5, 6);
    const size: number = Id3v2Reader.readFrameSize(dataView, 6);
    return new ID3V23Header(
      version,
      new ID3V2HeaderFlags(unsynchronization, extenderHeader, experimental),
      size
    );
  }

  private static readExtendedHeader(dataView: DataView, offset: number): ID3V23ExtendedHeader {
    const size: number = Id3v2Reader.readFrameSize(dataView, offset);
    const crcData: boolean = BufferUtil.isBitSetAt(dataView, offset + 4, 8);
    const padding: number = Id3v2Reader.readFrameSize(dataView, offset + 6);
    return new ID3V23ExtendedHeader(size, new Id3v2ExtendedHeaderFlags(crcData), padding);
  }

  private static readFrame(dataView: DataView, offset: number): ID3V23Frame {
    const frameId = BlobUtil.dataViewToString(dataView, offset, 4);
    const frameSize = Id3v2Reader.readFrameSize(dataView, offset + 4);
    const tagAlter = BufferUtil.isBitSetAt(dataView, 9, 8);
    const fileAlter = BufferUtil.isBitSetAt(dataView, 9, 7);
    const readonly = BufferUtil.isBitSetAt(dataView, 9, 6);
    const compression = BufferUtil.isBitSetAt(dataView, 10, 8);
    const encryption = BufferUtil.isBitSetAt(dataView, 10, 7);
    const groupingEntity = BufferUtil.isBitSetAt(dataView, 10, 6);
    const frameFlags = new ID3V2FrameFlags(
      tagAlter,
      fileAlter,
      readonly,
      compression,
      encryption,
      groupingEntity
    );
    const frameData = BlobUtil.dataViewToString(dataView, offset + 10, frameSize);
    return new ID3V23Frame(frameId, frameFlags, frameData, frameSize);
  }

  public static readFrameSize(dataView: DataView, offset: number = 0): number {
    const size1 = BlobUtil.dataViewToNum(dataView, offset);
    const size2 = BlobUtil.dataViewToNum(dataView, offset + 1);
    const size3 = BlobUtil.dataViewToNum(dataView, offset + 2);
    const size4 = BlobUtil.dataViewToNum(dataView, offset + 3);
    return (size1 << 21) + (size2 << 14) + (size3 << 7) + size4;
  }

  public static readGenres(frames: string): Array<Genre> {
    const regex: RegExp = new RegExp('([0-9]+)', 'gm');
    const frameArr: Array<string> = frames.match(regex);
    if (!frameArr) return [];
    return frameArr.map((frame: string) => {
      return Id3Reader.convertIndexToGenre(Number.parseInt(frame, 10));
    });
  }
}
