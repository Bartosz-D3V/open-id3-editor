import ID3 from './id3';
import BlobUtil from '../blob/blobUtil';

export default class Id3Reader {
  private static readonly MISSING_ID3 = 'Invalid MP3 file - ID3 tag is missing';

  public static readID3(dataView: DataView): ID3 {
    const offset: number = Id3Reader.getID3TagOffset(dataView);
    const title: string = BlobUtil.dataViewToString(dataView, offset + 3, 30);
    const artist: string = BlobUtil.dataViewToString(dataView, offset + 33, 30);
    const album: string = BlobUtil.dataViewToString(dataView, offset + 63, 30);
    const year: number = Number.parseInt(BlobUtil.dataViewToString(dataView, offset + 93, 4), 10);
    const comment: string = BlobUtil.dataViewToString(dataView, offset + 97, 28);
    const zeroByte: boolean = !!BlobUtil.dataViewToString(dataView, offset + 125, 1);
    const track: number = BlobUtil.dataViewToNum(dataView, offset + 126);
    const genre: number = BlobUtil.dataViewToNum(dataView, offset + 127);
    return new ID3(title, artist, album, year, comment, zeroByte, track, genre);
  }

  private static getID3TagOffset(dataView: DataView): number {
    const startTag: string = BlobUtil.dataViewToString(dataView, 0, 3);
    const endTag: string = BlobUtil.dataViewToString(dataView, dataView.byteLength - 128, 3);
    if (startTag === 'TAG') {
      return 0;
    } else if (endTag === 'TAG') {
      return dataView.byteLength - 128;
    } else {
      throw new Error(Id3Reader.MISSING_ID3);
    }
  }
}
