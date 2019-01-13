import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V10 from '../domain/id3V1-0';
import ID3V11 from '../domain/id3V1-1';

export default class Id3Writer {
  private static readonly TAG = 'TAG';

  public static convertID3V10ToDataView(id3: ID3V10): DataView {
    const header: DataView = new DataView(BufferUtil.createArrayBuffer(Id3Writer.TAG, 3));
    const title: DataView = new DataView(BufferUtil.createArrayBuffer(id3.title, 30));
    const artist: DataView = new DataView(BufferUtil.createArrayBuffer(id3.artist, 30));
    const album: DataView = new DataView(BufferUtil.createArrayBuffer(id3.album, 30));
    const yearAsString: string = id3.year ? id3.year.toString(10) : '';
    const year: DataView = new DataView(BufferUtil.createArrayBuffer(yearAsString, 4));
    const comment: DataView = new DataView(BufferUtil.createArrayBuffer(id3.comment, 30));
    const genreIndex: number = id3.genre ? id3.genre.index : null;
    const genre: DataView = new DataView(BufferUtil.createArrayBuffer(genreIndex, 1));
    return BlobUtil.concatDataViews(header, title, artist, album, year, comment, genre);
  }

  public static convertID3V11ToDataView(id3: ID3V11): DataView {
    const header: DataView = new DataView(BufferUtil.createArrayBuffer(Id3Writer.TAG, 3));
    const title: DataView = new DataView(BufferUtil.createArrayBuffer(id3.title, 30));
    const artist: DataView = new DataView(BufferUtil.createArrayBuffer(id3.artist, 30));
    const album: DataView = new DataView(BufferUtil.createArrayBuffer(id3.album, 30));
    const yearAsString: string = id3.year ? id3.year.toString(10) : '';
    const year: DataView = new DataView(BufferUtil.createArrayBuffer(yearAsString, 4));
    const comment: DataView = new DataView(BufferUtil.createArrayBuffer(id3.comment, 28));
    const zeroByte: DataView = new DataView(
      BufferUtil.createArrayBuffer(Id3Writer.boolToBitChar(id3.zeroByte), 1)
    );
    const track: DataView = new DataView(BufferUtil.createArrayBuffer(id3.track, 1));
    const genreIndex: number = id3.genre ? id3.genre.index : null;
    const genre: DataView = new DataView(BufferUtil.createArrayBuffer(genreIndex, 1));
    return BlobUtil.concatDataViews(
      header,
      title,
      artist,
      album,
      year,
      comment,
      zeroByte,
      track,
      genre
    );
  }

  private static boolToBitChar = (bool: boolean): string => (bool ? '1' : '0');
}
