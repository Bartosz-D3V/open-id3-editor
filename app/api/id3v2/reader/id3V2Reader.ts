import BlobUtil from '@api/common/blob/blobUtil';
import ID3V22 from '../domain/2.2/id3V2';
import ID3V23 from '../domain/2.3/id3V2';
import ID3V22Header from '../domain/2.2/id3V2Header';
import ID3V22Frame from '../domain/2.2/id3V2Frame';
import ID3V23Frame from '../domain/2.3/id3V2Frame';
import ID3V23FrameWrapper from '../domain/2.3/id3V2FrameWrapper';
import ID3V22Flags from '../domain/2.2/id3v2Flags';
import ID3V2HeaderFlags from '../domain/2.3/id3v2HeaderFlags';
import ID3V2FrameFlags from '../domain/2.3/id3v2FrameFlags';
import ID3V23Header from '../domain/2.3/id3V2Header';
import { FrameID } from '../domain/2.3/frameID';

export default class ID3V2Reader {
  public static readID3V22(dataView: DataView): ID3V22 {
    const offset = 0;
    const version: string = BlobUtil.dataViewToString(dataView, offset + 3, 2);
    const unsynchronization: boolean = !BlobUtil.dataViewToString(dataView, offset + 5, 1);
    const compression: boolean = !BlobUtil.dataViewToString(dataView, offset + 6, 1);
    const size: number = ID3V2Reader.readFrameSize(dataView, 7);
    const header: ID3V22Header = new ID3V22Header(
      version,
      new ID3V22Flags(unsynchronization, compression),
      size
    );

    const data: Array<ID3V22Frame> = [];
    let i = 11;
    while (i < size) {
      const frameId = BlobUtil.dataViewToString(dataView, i, 3);
      const frameSize = ID3V2Reader.readFrameSize(dataView, i + 3);
      const frameData = BlobUtil.dataViewToString(dataView, i + 7, frameSize);
      data.push(new ID3V22Frame(frameId, frameData));
      i += frameSize + 7;
    }
    return new ID3V22(header, data);
  }

  public static readID3V23(dataView: DataView): ID3V23 {
    const offset = 0;
    const version: string = BlobUtil.dataViewToString(dataView, offset + 4, 2);
    const unsynchronization: boolean = !BlobUtil.dataViewToString(dataView, offset + 6, 1);
    const extenderHeader: boolean = !BlobUtil.dataViewToString(dataView, offset + 7, 1);
    const experimental: boolean = !BlobUtil.dataViewToString(dataView, offset + 8, 1);
    const size: number = ID3V2Reader.readFrameSize(dataView, 9);
    const header: ID3V23Header = new ID3V23Header(
      version,
      new ID3V2HeaderFlags(unsynchronization, extenderHeader, experimental),
      size
    );

    const data: Array<ID3V23FrameWrapper> = [];
    let i = 10;
    while (i < size) {
      console.log(BlobUtil.dataViewToString(dataView, 0, dataView.byteLength));
      const frameId = ID3V2Reader.getFrameID(BlobUtil.dataViewToString(dataView, i, 4));
      console.log('frameID' + frameId);
      const frameSize = ID3V2Reader.readFrameSize(dataView, i + 5);
      console.log('frameSize' + frameSize);
      const tagAlter = !BlobUtil.dataViewToString(dataView, i + 8, 1);
      console.log('tagAlter' + tagAlter);
      const fileAlter = !BlobUtil.dataViewToString(dataView, i + 9, 1);
      console.log('fileAlter' + fileAlter);
      const readonly = !BlobUtil.dataViewToString(dataView, i + 10, 1);
      console.log('readonly' + readonly);
      const compression = !BlobUtil.dataViewToString(dataView, i + 11, 1);
      console.log('compression' + compression);
      const encryption = !BlobUtil.dataViewToString(dataView, i + 12, 1);
      console.log('encryption' + encryption);
      const groupingEntity = !BlobUtil.dataViewToString(dataView, i + 13, 1);
      console.log('groupingEntity' + groupingEntity);
      const frameFlags = new ID3V2FrameFlags(
        tagAlter,
        fileAlter,
        readonly,
        compression,
        encryption,
        groupingEntity
      );
      const frameData = BlobUtil.dataViewToString(dataView, i + 13, frameSize);
      const frame: ID3V23Frame = new ID3V23Frame(frameId, frameSize, frameFlags);
      const frameWrapper: ID3V23FrameWrapper = new ID3V23FrameWrapper(frame, frameData);
      data.push(frameWrapper);
      i += frameSize + 10;
    }

    return new ID3V23(header, data);
  }

  public static readFrameSize(dataView: DataView, offset: number): number {
    const size1 = BlobUtil.dataViewToNum(dataView, offset);
    const size2 = BlobUtil.dataViewToNum(dataView, offset + 1);
    const size3 = BlobUtil.dataViewToNum(dataView, offset + 2);
    const size4 = BlobUtil.dataViewToNum(dataView, offset + 3);
    return (size4 << 21) + (size3 << 14) + (size2 << 7) + size1;
  }

  private static getFrameID(tagId: string): FrameID | string {
    const frameID: any = Object.keys(FrameID).find(key => key === tagId);
    return frameID ? FrameID[frameID] : tagId;
  }
}
