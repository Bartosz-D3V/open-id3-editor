import ID3V1 from './id3V1';
import BlobUtil from '../common/blob/blobUtil';

export default class Id3V1Reader {
  public static readID3V1(dataView: DataView): ID3V1 {
    const offset: number = dataView.byteLength - 128;
    const title: string = BlobUtil.dataViewToString(dataView, offset + 3, 30);
    const artist: string = BlobUtil.dataViewToString(dataView, offset + 33, 30);
    const album: string = BlobUtil.dataViewToString(dataView, offset + 63, 30);
    const year: number = Number.parseInt(BlobUtil.dataViewToString(dataView, offset + 93, 4), 10);
    const comment: string = BlobUtil.dataViewToString(dataView, offset + 97, 28);
    const zeroByte: boolean = !!BlobUtil.dataViewToString(dataView, offset + 125, 1);
    const track: number = BlobUtil.dataViewToNum(dataView, offset + 126);
    const genre: number = BlobUtil.dataViewToNum(dataView, offset + 127);
    return new ID3V1(title, artist, album, year, comment, zeroByte, track, genre);
  }
}
