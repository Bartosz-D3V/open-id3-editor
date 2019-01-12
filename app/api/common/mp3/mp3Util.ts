import BlobUtil from '@api/common/blob/blobUtil';
import ID3V10 from '@api/id3v1/domain/id3V1-0';
import ID3V11 from '@api/id3v1/domain/id3V1-1';
import FsUtil from '@api/common/fs/fsUtil';

export default class Mp3Util {
  public static hasID3V1 = (dataView: DataView): boolean => {
    return dataView.byteLength < 128
      ? false
      : BlobUtil.dataViewToString(dataView, dataView.byteLength - 128, 3) === 'TAG';
  };

  public static hasID3V2 = (dataView: DataView): boolean => {
    return dataView.byteLength < 128 ? false : BlobUtil.dataViewToString(dataView, 0, 3) === 'ID3';
  };

  public static deleteID3V10 = async (electronFile: any): Promise<ID3V10> => {
    await Mp3Util.truncateID3V1(electronFile);
    return new ID3V10();
  };

  public static deleteID3V11 = async (electronFile: any): Promise<ID3V11> => {
    await Mp3Util.truncateID3V1(electronFile);
    return new ID3V11();
  };

  private static truncateID3V1 = async (electronFile: any): Promise<void> => {
    if (Mp3Util.hasID3V1(electronFile)) {
      await FsUtil.truncate(electronFile.path, 128);
    }
  };
}
