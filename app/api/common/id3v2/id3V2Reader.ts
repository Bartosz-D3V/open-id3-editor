import BlobUtil from '../blob/blobUtil';
import ID3V2 from './id3V2';
import ID3V2Header from './id3V2Header';
import ID3V2Frame from './id3V2Frame';
import ID3V2FrameWrapper from './id3V2FrameWrapper';
import { FrameID } from './frameID';
import StringUtil from '../string/stringUtil';
import BufferUtil from '../buffer/bufferUtil';

export default class ID3V2Reader {
  private static readonly MISSING_ID3 = 'Invalid MP3 file - ID3V2 tag is missing';
  private static readonly ID3_ENDING_CHAR = ';';

  public static readID3V2(dataView: DataView): ID3V2 {
    const offset: number = ID3V2Reader.getID3V2TagOffset(dataView);
    const version: string = BlobUtil.dataViewToString(dataView, offset + 3, 2);
    const flags: string = BlobUtil.dataViewToString(dataView, offset + 5, 1);
    const size: number = ID3V2Reader.readFrameSize(dataView, 7);
    const header: ID3V2Header = new ID3V2Header(version, flags, size);

    const data: Array<ID3V2FrameWrapper> = [];
    let semiFound = false;
    let i = 10;
    while (!semiFound) {
      if (BlobUtil.dataViewToString(dataView, i, 1) === ID3V2Reader.ID3_ENDING_CHAR) {
        semiFound = true;
        break;
      }
      const frameId = ID3V2Reader.getFrameID(BlobUtil.dataViewToString(dataView, i, 4));
      const frameSize = ID3V2Reader.readFrameSize(dataView, i + 4);
      const frameFlags = BlobUtil.dataViewToString(dataView, i + 8, 2);
      const frameData = BlobUtil.dataViewToString(dataView, i + 10, frameSize);
      const frame: ID3V2Frame = new ID3V2Frame(frameId, frameSize, frameFlags);
      const frameWrapper: ID3V2FrameWrapper = new ID3V2FrameWrapper(frame, frameData);
      data.push(frameWrapper);
      i += 1;
    }

    return new ID3V2(header, data);
  }

  private static readID3V2Size(dataView: DataView, offset: number): number {
    const data: string = BufferUtil.decodeArrayBuffer(dataView.buffer);
    const size1 = StringUtil.getByteAt(data, offset);
    const size2 = StringUtil.getByteAt(data, offset + 1);
    const size3 = StringUtil.getByteAt(data, offset + 2);
    const size4 = StringUtil.getByteAt(data, offset + 3);
    return (size4 & 0x7f) | ((size3 & 0x7f) << 7) | ((size2 & 0x7f) << 14) | ((size1 & 0x7f) << 21);
  }

  private static readFrameSize(dataView: DataView, offset: number): number {
    const size1 = BlobUtil.dataViewToNum(dataView, offset);
    const size2 = BlobUtil.dataViewToNum(dataView, offset + 1);
    const size3 = BlobUtil.dataViewToNum(dataView, offset + 2);
    const size4 = BlobUtil.dataViewToNum(dataView, offset + 3);
    return size1 + size2 + size3 + size4;
  }

  private static getID3V2TagOffset(dataView: DataView): number {
    const tag: string = BlobUtil.dataViewToString(dataView, 0, 3);
    if (tag === 'ID3') {
      return 0;
    }
    throw new Error(ID3V2Reader.MISSING_ID3);
  }

  private static getFrameID(tagId: string): FrameID | string {
    return Object.keys(FrameID).find(key => key === tagId) || tagId;
  }
}
