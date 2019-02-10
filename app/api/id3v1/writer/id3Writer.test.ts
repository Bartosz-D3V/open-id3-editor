import Genre from '@api/id3/domain/genre';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V10 from '../domain/id3V1-0';
import ID3V11 from '../domain/id3V1-1';
import Id3Writer from './id3Writer';

describe('ID3Writer', () => {
  describe('convertID3V10ToDataView function', () => {
    it('should convert full ID3V10 to DataView', () => {
      const id3: ID3V10 = new ID3V10(
        'title',
        'artist',
        'album',
        2000,
        'comment',
        new Genre(0, 'Blues')
      );
      const dataView: DataView = Id3Writer.convertID3V10ToDataView(id3);

      expect(BlobUtil.dataViewToString(dataView, 0, 3)).toEqual('TAG');
      expect(BlobUtil.dataViewToString(dataView, 3, 30)).toEqual('title');
      expect(BlobUtil.dataViewToString(dataView, 33, 30)).toEqual('artist');
      expect(BlobUtil.dataViewToString(dataView, 63, 30)).toEqual('album');
      expect(BlobUtil.dataViewToString(dataView, 93, 4)).toEqual('2000');
      expect(BlobUtil.dataViewToString(dataView, 97, 30)).toEqual('comment');
      expect(BlobUtil.dataViewToNum(dataView, 127)).toEqual(0);
    });

    it('should convert partial ID3V10 to DataView', () => {
      const id3: ID3V10 = new ID3V10(null, 'artist', 'album', 2000, null, null);
      const dataView: DataView = Id3Writer.convertID3V10ToDataView(id3);

      expect(BlobUtil.dataViewToString(dataView, 0, 3)).toEqual('TAG');
      expect(BlobUtil.dataViewToString(dataView, 3, 30)).toEqual('');
      expect(BlobUtil.dataViewToString(dataView, 33, 30)).toEqual('artist');
      expect(BlobUtil.dataViewToString(dataView, 63, 30)).toEqual('album');
      expect(BlobUtil.dataViewToString(dataView, 93, 4)).toEqual('2000');
      expect(BlobUtil.dataViewToString(dataView, 97, 30)).toEqual('');
      expect(BlobUtil.dataViewToNum(dataView, 127)).toEqual(255);
    });
  });

  describe('convertID3V11ToDataView function', () => {
    it('should convert full ID3V11 to DataView', () => {
      const id3: ID3V11 = new ID3V11(
        'title',
        'artist',
        'album',
        2000,
        'comment',
        true,
        16,
        new Genre(70, 'Darkwave')
      );
      const dataView: DataView = Id3Writer.convertID3V11ToDataView(id3);

      expect(BlobUtil.dataViewToString(dataView, 0, 3)).toEqual('TAG');
      expect(BlobUtil.dataViewToString(dataView, 3, 30)).toEqual('title');
      expect(BlobUtil.dataViewToString(dataView, 33, 30)).toEqual('artist');
      expect(BlobUtil.dataViewToString(dataView, 63, 30)).toEqual('album');
      expect(BlobUtil.dataViewToString(dataView, 93, 4)).toEqual('2000');
      expect(BlobUtil.dataViewToString(dataView, 97, 28)).toEqual('comment');
      expect(BlobUtil.dataViewToString(dataView, 125, 1)).toBeTruthy();
      expect(BlobUtil.dataViewToNum(dataView, 126)).toEqual(16);
      expect(BlobUtil.dataViewToNum(dataView, 127)).toEqual(70);
    });

    it('should convert partial ID3V11 to DataView', () => {
      const id3: ID3V11 = new ID3V11(null, null, 'album', 2000, 'comment', true, 16, null);
      const dataView: DataView = Id3Writer.convertID3V11ToDataView(id3);

      expect(BlobUtil.dataViewToString(dataView, 0, 3)).toEqual('TAG');
      expect(BlobUtil.dataViewToString(dataView, 3, 30)).toEqual('');
      expect(BlobUtil.dataViewToString(dataView, 33, 30)).toEqual('');
      expect(BlobUtil.dataViewToString(dataView, 63, 30)).toEqual('album');
      expect(BlobUtil.dataViewToString(dataView, 93, 4)).toEqual('2000');
      expect(BlobUtil.dataViewToString(dataView, 97, 28)).toEqual('comment');
      expect(BlobUtil.dataViewToString(dataView, 125, 1)).toBeTruthy();
      expect(BlobUtil.dataViewToNum(dataView, 126)).toEqual(16);
      expect(BlobUtil.dataViewToNum(dataView, 127)).toEqual(255);
    });
  });
});
