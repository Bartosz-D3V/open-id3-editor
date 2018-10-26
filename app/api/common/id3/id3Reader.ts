import ID3 from './id3';
import BlobUtil from '../blob/blobUtil';

export default class Id3Reader {
  public static readID3(dataView: DataView): ID3 {
    const title: string = BlobUtil.dataViewToString(dataView, 3, 30);
    const artist: string = BlobUtil.dataViewToString(dataView, 33, 30);
    const album: string = BlobUtil.dataViewToString(dataView, 63, 30);
    const year: number = Number.parseInt(BlobUtil.dataViewToString(dataView, 93, 4), 10);
    const comment: string = BlobUtil.dataViewToString(dataView, 97, 28);
    const zeroByte: boolean = !!BlobUtil.dataViewToString(dataView, 125, 1);
    const track: number = Number.parseInt(BlobUtil.dataViewToString(dataView, 126, 1), 10);
    console.log(BlobUtil.dataViewToString(dataView, 126, 1));
    const genre: number = Number.parseInt(BlobUtil.dataViewToString(dataView, 127, 1), 10);
    return new ID3(title, artist, album, year, comment, zeroByte, track, genre);
  }
}
