import BlobUtil from '@api/common/blob/blobUtil';
import ID3V10 from '@api/id3v1/domain/id3V1-0';
import ID3V11 from '@api/id3v1/domain/id3V1-1';
import FsUtil from '@api/common/fs/fsUtil';
import ID3V23 from '@api/id3v2/domain/2.3/id3v2';
import ID3V23Header from '@api/id3v2/domain/2.3/id3v2Header';
import ID3V23HeaderFlags from '@api/id3v2/domain/2.3/id3v2HeaderFlags';

export default class ID3Util {
  public static hasID3V1 = (dataView: DataView): boolean => {
    return dataView.byteLength < 128
      ? false
      : BlobUtil.dataViewToString(dataView, dataView.byteLength - 128, 3) === 'TAG';
  };

  public static hasID3V2 = (dataView: DataView): boolean => {
    return dataView.byteLength < 10 ? false : BlobUtil.dataViewToString(dataView, 0, 3) === 'ID3';
  };

  public static hasID3Version = (dataView: DataView, version: string): boolean => {
    return dataView.byteLength < 10 ? false : BlobUtil.dataViewToString(dataView, 3, 2) === version;
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

  public static deleteID3V23 = async (electronFile: any, length: number): Promise<ID3V23> => {
    await ID3Util.truncateID3V2(electronFile, length);
    return new ID3V23(new ID3V23Header('22', new ID3V23HeaderFlags(), 0), []);
  };

  private static truncateID3V2 = async (electronFile: any, length: number): Promise<void> => {
    const dataView: DataView = await BlobUtil.blobToDataView(electronFile);
    if (ID3Util.hasID3V2(dataView)) {
      await FsUtil.deleteFromBeginning(electronFile.path, length);
    }
  };
}
