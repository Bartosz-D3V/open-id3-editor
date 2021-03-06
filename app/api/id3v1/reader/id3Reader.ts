import Genre from '@api/id3/domain/genre';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V11 from '../domain/id3V1-1';
import ID3V10 from '../domain/id3V1-0';
import ID3Util from '@api/id3/util/id3Util';

export default class ID3Reader {
  public static readID3V10(dataView: DataView): ID3V10 {
    const offset: number = dataView.byteLength - 128;
    const title: string = BlobUtil.dataViewToString(dataView, offset + 3, 30);
    const artist: string = BlobUtil.dataViewToString(dataView, offset + 33, 30);
    const album: string = BlobUtil.dataViewToString(dataView, offset + 63, 30);
    const year: number = Number.parseInt(BlobUtil.dataViewToString(dataView, offset + 93, 4), 10);
    const comment: string = BlobUtil.dataViewToString(dataView, offset + 97, 30);
    const genre: Genre = ID3Util.convertIndexToGenre(
      BlobUtil.dataViewToNum(dataView, offset + 127)
    );
    return new ID3V10(title, artist, album, year, comment, genre);
  }

  public static readID3V11(dataView: DataView): ID3V11 {
    const offset: number = dataView.byteLength - 128;
    const title: string = BlobUtil.dataViewToString(dataView, offset + 3, 30);
    const artist: string = BlobUtil.dataViewToString(dataView, offset + 33, 30);
    const album: string = BlobUtil.dataViewToString(dataView, offset + 63, 30);
    const year: number = Number.parseInt(BlobUtil.dataViewToString(dataView, offset + 93, 4), 10);
    const comment: string = BlobUtil.dataViewToString(dataView, offset + 97, 28);
    const zeroByte: boolean = !!BlobUtil.dataViewToString(dataView, offset + 125, 1);
    const track: number = BlobUtil.dataViewToNum(dataView, offset + 126);
    const genre: Genre = ID3Util.convertIndexToGenre(
      BlobUtil.dataViewToNum(dataView, offset + 127)
    );
    return new ID3V11(title, artist, album, year, comment, zeroByte, track, genre);
  }
}
