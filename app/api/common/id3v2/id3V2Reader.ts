import BlobUtil from '../blob/blobUtil';
import ID3V2 from './id3V2';
import ID3V2Header from './id3V2Header';
import { FrameID } from './frameID';

export default class ID3V2Reader {
  private static readonly MISSING_ID3 = 'Invalid MP3 file - ID3V2 tag is missing';

  public static readID3V2(dataView: DataView): ID3V2 {
    const offset: number = ID3V2Reader.getID3V2TagOffset(dataView);
    const version: string = BlobUtil.dataViewToString(dataView, offset + 6, 2);
    const flags: string = BlobUtil.dataViewToString(dataView, offset + 8, 1);
    const size: number = BlobUtil.dataViewToNum(dataView, offset + 9);
    const header: ID3V2Header = new ID3V2Header(version, flags, size);

    return new ID3V2(header, null);
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
