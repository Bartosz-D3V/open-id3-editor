import BlobUtil from '../../common/blob/blobUtil';
import ID3V2 from './domain/id3V2';
import ID3V2Header from './domain/id3V2Header';
import ID3V2Frame from './domain/id3V2Frame';
import ID3V2FrameWrapper from './domain/id3V2FrameWrapper';
import { FrameID } from './domain/frameID';

export default class ID3V2Reader {
  private static readonly MISSING_ID3 = 'Invalid MP3 file - ID3V2 tag is missing';

  public static readID3V2(dataView: DataView): ID3V2 {
    const offset: number = ID3V2Reader.getID3V2TagOffset(dataView);
    const version: string = BlobUtil.dataViewToString(dataView, offset + 4, 2);
    const flags: string = BlobUtil.dataViewToString(dataView, offset + 6, 1);
    const size: number = ID3V2Reader.getFrameSize(dataView, 7);
    const header: ID3V2Header = new ID3V2Header(version, flags, size);

    const data: Array<ID3V2FrameWrapper> = [];
    let i = 10;
    while (i < size - 10 && dataView.getInt8(i) !== 0x00) {
      const frameId = ID3V2Reader.getFrameID(BlobUtil.dataViewToString(dataView, i, 4));
      const frameSize = ID3V2Reader.getFrameSize(dataView, i + 4);
      const frameFlags = BlobUtil.dataViewToString(dataView, i + 8, 2);
      const frameData = BlobUtil.dataViewToString(dataView, i + 10, frameSize);
      const frame: ID3V2Frame = new ID3V2Frame(frameId, frameSize, frameFlags);
      const frameWrapper: ID3V2FrameWrapper = new ID3V2FrameWrapper(frame, frameData);
      data.push(frameWrapper);
      i += frameSize + 10;
    }

    return new ID3V2(header, data);
  }

  public static getID3V2Size = (dataView: DataView, offset: number): number => {
    const size1 = BlobUtil.dataViewToNum(dataView, offset);
    const size2 = BlobUtil.dataViewToNum(dataView, offset + 1);
    const size3 = BlobUtil.dataViewToNum(dataView, offset + 2);
    const size4 = BlobUtil.dataViewToNum(dataView, offset + 3);
    return size1 + size2 + size3 + size4;
  };

  private static getFrameSize(dataView: DataView, offset: number): number {
    const size1 = BlobUtil.dataViewToNum(dataView, offset);
    const size2 = BlobUtil.dataViewToNum(dataView, offset + 1);
    const size3 = BlobUtil.dataViewToNum(dataView, offset + 2);
    const size4 = BlobUtil.dataViewToNum(dataView, offset + 3);
    return size4 + (size1 << 21) + (size2 << 14) + (size3 << 7);
  }

  private static getFrameID(tagId: string): FrameID | string {
    const frameID: any = Object.keys(FrameID).find(key => key === tagId);
    return frameID ? FrameID[frameID] : tagId;
  }

  private static getID3V2TagOffset(dataView: DataView): number {
    const tag: string = BlobUtil.dataViewToString(dataView, 0, 3);
    if (tag === 'ID3') {
      return 0;
    }
    throw new Error(ID3V2Reader.MISSING_ID3);
  }
}
