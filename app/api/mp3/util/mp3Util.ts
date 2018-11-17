import BlobUtil from '../../common/blob/blobUtil';

export default class Mp3Util {
  public static hasID3V1 = (dataView: DataView): boolean => {
    if (dataView.byteLength < 128) {
      return false;
    }
    return BlobUtil.dataViewToString(dataView, dataView.byteLength - 128, 3) === 'TAG';
  };

  public static hasID3V2 = (dataView: DataView): boolean => {
    if (dataView.byteLength < 128) {
      return false;
    }
    return BlobUtil.dataViewToString(dataView, 0, 3) === 'ID3';
  };
}
