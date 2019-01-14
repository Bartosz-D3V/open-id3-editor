import BlobUtil from '@api/common/blob/blobUtil';
import ID3V2 from '../domain/id3V2';
import ID3V2Header from '../domain/id3V2Header';
import ID3V2Frame from '../domain/id3V2Frame';
import ID3V2FrameWrapper from '../domain/id3V2FrameWrapper';
import { FrameID } from '../domain/frameID';
import Id3v2Flags from '../domain/id3v2Flags';

export default class ID3V2Reader {
  public static readID3V20(dataView: DataView): ID3V2 {
    const offset = 0;
    const version: string = BlobUtil.dataViewToString(dataView, offset + 4, 2);
    const unsynchronization: boolean = !!BlobUtil.dataViewToString(dataView, offset + 6, 1);
    const compression: boolean = !!BlobUtil.dataViewToString(dataView, offset + 7, 1);
    const size: number = ID3V2Reader.readFrameSize(dataView, 7);
    const header: ID3V2Header = new ID3V2Header(
      version,
      new Id3v2Flags(unsynchronization, compression),
      size
    );
    const data: Array<ID3V2FrameWrapper> = [];
    let i = 10;

    while (i < size - 10 && dataView.getInt8(i) !== 0x00) {
      const frameId = ID3V2Reader.getFrameID(BlobUtil.dataViewToString(dataView, i, 4));
      const frameSize = ID3V2Reader.readFrameSize(dataView, i + 4);
      const unsynchronizationFrame = !!BlobUtil.dataViewToString(dataView, i + 8, 1);
      const compressionFrame = !!BlobUtil.dataViewToString(dataView, i + 9, 1);
      const frameData = BlobUtil.dataViewToString(dataView, i + 10, frameSize);
      const frame: ID3V2Frame = new ID3V2Frame(
        frameId,
        frameSize,
        new Id3v2Flags(unsynchronization, compression)
      );
      const frameWrapper: ID3V2FrameWrapper = new ID3V2FrameWrapper(frame, frameData);
      data.push(frameWrapper);
      i += frameSize + 10;
    }

    return new ID3V2(header, data);
  }

  private static readFrameSize(dataView: DataView, offset: number): number {
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
}
