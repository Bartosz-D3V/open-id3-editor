import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import Mp3Util from './mp3Util';

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
});
