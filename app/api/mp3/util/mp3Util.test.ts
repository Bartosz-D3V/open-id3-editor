import BufferUtil from '../../common/buffer/bufferUtil';
import Mp3Util from './mp3Util';
import BlobUtil from '../../common/blob/blobUtil';
import FsUtil from '../../common/fs/fsUtil';

describe('mp3Util', () => {
  describe('hasID3V1 function', () => {
    it('should return true if file contains ID3V1 tag', () => {
      const emptyView1: DataView = new DataView(new ArrayBuffer(0));
      const emptyView2: DataView = new DataView(new ArrayBuffer(125));
      const tag: ArrayBuffer = BufferUtil.createArrayBuffer('TAG');
      const tagView: DataView = new DataView(tag);
      const mockFile: DataView = BlobUtil.concatDataViews(emptyView1, tagView, emptyView2);

      expect(Mp3Util.hasID3V1(mockFile)).toBeTruthy();
    });

    it('should return false if file does not contain ID3V1 tag', () => {
      const tag: ArrayBuffer = BufferUtil.createArrayBuffer('Test');
      const mockFile: DataView = new DataView(tag);

      expect(Mp3Util.hasID3V1(mockFile)).toBeFalsy();
    });
  });

  describe('hasID3V2 function', () => {
    it('should return true if file contains ID3V2 tag', () => {
      const tag: ArrayBuffer = BufferUtil.createArrayBuffer('ID3', 200);
      const mockFile: DataView = new DataView(tag);

      expect(Mp3Util.hasID3V2(mockFile)).toBeTruthy();
    });

    it('should return false if file does not contain ID3V2 tag', () => {
      const tag: ArrayBuffer = BufferUtil.createArrayBuffer('Test');
      const mockFile: DataView = new DataView(tag);

      expect(Mp3Util.hasID3V2(mockFile)).toBeFalsy();
    });
  });

  describe('getMP3WithoutTags function', () => {
    it('should return original dataView if it does not contain tags', () => {
      const dataView: DataView = new DataView(new ArrayBuffer(200));

      expect(Mp3Util.getMP3WithoutTags(dataView)).toEqual(dataView);
    });

    it('should return return dataView with removed tags', async () => {
      const mockMp3: Buffer = await FsUtil.readFile(
        `${__dirname}/../id3v2/mockID3Files/id3v2_001_basic.mp3`
      );
      const mockMp3NoTags: Buffer = await FsUtil.readFile(
        `${__dirname}/../id3v2/mockID3Files/id3v2_001_no_tags.mp3`
      );
      const mockMp3View: DataView = new DataView(mockMp3.buffer);
      const mockMp3NoTagsView: DataView = new DataView(mockMp3NoTags.buffer);
      const strippedMockView = Mp3Util.getMP3WithoutTags(mockMp3View);

      expect(mockMp3View).toEqual(mockMp3NoTagsView);
      expect(strippedMockView.byteLength).toBeLessThan(128);
      expect(BlobUtil.dataViewToString(strippedMockView, 0, 3)).not.toEqual('ID3');
    });
  });
});
