import BlobUtil from '@api/common/blob/blobUtil';
import ID3V10 from '@api/id3v1/domain/id3V1-0';
import ID3V11 from '@api/id3v1/domain/id3V1-1';
import ID3V22 from '@api/id3v2/domain/2.2/id3v2';
import FsUtil from '@api/common/fs/fsUtil';
import ID3V2Header from '@api/id3v2/domain/2.2/id3v2Header';
import ID3V2HeaderFlags from '@api/id3v2/domain/2.2/id3v2HeaderFlags';

export default class ID3Util {
  public static hasID3V1 = (dataView: DataView): boolean => {
    return dataView.byteLength < 128
      ? false
      : BlobUtil.dataViewToString(dataView, dataView.byteLength - 128, 3) === 'TAG';
  };

  public static hasID3V2 = (dataView: DataView): boolean => {
    return dataView.byteLength < 128 ? false : BlobUtil.dataViewToString(dataView, 0, 3) === 'ID3';
  };

  public static hadID3V22 = (dataView: DataView): boolean => {
    return dataView.byteLength < 128 ? false : BlobUtil.dataViewToString(dataView, 3, 2) === '22';
  };

  public static hadID3V23 = (dataView: DataView): boolean => {
    return dataView.byteLength < 128 ? false : BlobUtil.dataViewToString(dataView, 3, 2) === '23';
  };

  public static deleteID3V10 = async (electronFile: any): Promise<ID3V10> => {
    await ID3Util.truncateID3V1(electronFile);
    return new ID3V10();
  };

  public static deleteID3V11 = async (electronFile: any): Promise<ID3V11> => {
    await ID3Util.truncateID3V1(electronFile);
    return new ID3V11();
  };

  private static truncateID3V1 = async (electronFile: any): Promise<void> => {
    if (ID3Util.hasID3V1(electronFile)) {
      await FsUtil.truncate(electronFile.path, 128);
    }
  };

  public static deleteID3V22 = async (electronFile: any, length: number): Promise<ID3V22> => {
    await ID3Util.truncateID3V2(electronFile, length);
    return new ID3V22(new ID3V2Header('22', new ID3V2HeaderFlags(), 0), []);
  };

  private static truncateID3V2 = async (electronFile: any, length: number): Promise<void> => {
    if (ID3Util.hasID3V2(electronFile)) {
      await FsUtil.deleteFromBeginning(electronFile.path, length);
    }
  };
}
