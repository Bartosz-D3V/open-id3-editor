import ID3V1 from './id3V1';
import BlobUtil from '../blob/blobUtil';

export default class Id3V1Reader {
  private static readonly MISSING_ID3 = 'Invalid MP3 file - ID3V1 tag is missing';

  public static readID3V1(dataView: DataView): ID3V1 {
    const offset: number = Id3V1Reader.getID3V1TagOffset(dataView);
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

  private static getID3V1TagOffset(dataView: DataView): number {
    const tag: string = BlobUtil.dataViewToString(dataView, dataView.byteLength - 128, 3);
    if (tag === 'TAG') {
      return dataView.byteLength - 128;
    }
    throw new Error(Id3V1Reader.MISSING_ID3);
  }
}
