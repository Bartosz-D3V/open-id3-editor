import FsUtil from '@api/common/fs/fsUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3Writer from '@api/id3v2/writer/id3v2Writer';
import ID3V10 from '@api/id3v1/domain/id3V1-0';
import ID3V11 from '@api/id3v1/domain/id3V1-1';
import ID3V23 from '@api/id3v2/domain/2.3/id3v2';
import ID3V23Header from '@api/id3v2/domain/2.3/id3v2Header';
import ID3V23Frame from '@api/id3v2/domain/2.3/id3v2Frame';
import ID3V23HeaderFlags from '@api/id3v2/domain/2.3/id3v2HeaderFlags';
import Genre from '@api/id3/domain/genre';
import { genres } from '@api/id3/domain/genres';

export default class ID3Util {
  public static hasID3V1 = (dataView: DataView): boolean => {
    return dataView.byteLength < 128
      ? false
      : BlobUtil.dataViewToString(dataView, dataView.byteLength - 128, 3) === 'TAG';
  };

  public static hasID3V2 = (dataView: DataView): boolean => {
    return dataView.byteLength < 10 ? false : BlobUtil.dataViewToString(dataView, 0, 3) === 'ID3';
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
    return new ID3V23(new ID3V23Header(3, new ID3V23HeaderFlags(), 0), []);
  };

  private static truncateID3V2 = async (electronFile: any, length: number): Promise<void> => {
    const dataView: DataView = await BlobUtil.blobToDataView(electronFile);
    if (ID3Util.hasID3V2(dataView)) {
      await FsUtil.deleteFromBeginning(electronFile.path, length);
    }
  };

  public static convertIndexToGenre = (index: number): Genre =>
    genres.find(value => value.index === index);

  public static findFrame = (id3: ID3V23, frameId: string): ID3V23Frame =>
    id3.body.find(value => value.frameID === frameId);

  public static updateFrame = (id3: ID3V23, frame: ID3V23Frame): ID3V23 => {
    const oldFrame = ID3Util.findFrame(id3, frame.frameID);
    if (oldFrame) {
      id3.body.splice(id3.body.indexOf(frame), 1);
    }
    id3.body.push(frame);
    id3.header.size = ID3Writer.calcV2HeaderSize(id3.body, 3);
    return id3;
  };
}
