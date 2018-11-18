import BlobUtil from '../../common/blob/blobUtil';
import ID3V2Reader from '../id3v2/id3V2Reader';

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

  public static getMP3WithoutTags(dataView: DataView): DataView {
    let mp3Buffer: ArrayBuffer = dataView.buffer;
    let viewSize = dataView.byteLength;
    if (Mp3Util.hasID3V2(dataView)) {
      const id3V2Size = ID3V2Reader.getID3V2Size(dataView, 7);
      mp3Buffer = mp3Buffer.slice(viewSize - id3V2Size);
      viewSize = mp3Buffer.byteLength;
    }
    if (Mp3Util.hasID3V1(dataView)) {
      mp3Buffer = mp3Buffer.slice(0, viewSize - 128);
    }
    return new DataView(mp3Buffer);
  }
}
