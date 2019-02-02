import fs from 'fs';
import path from 'path';
import Id3Util from './id3Util';
import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V10 from '@api/id3v1/domain/id3V1-0';
import ID3V11 from '@api/id3v1/domain/id3V1-1';

const mp3Dir: string = path.resolve('./example_mp3');
const mockPath = `${mp3Dir}/ID3V10/id3v1_004_basic.mp3`;

describe('mp3Util', () => {
  describe('hasID3V1 function', () => {
    it('should return true if file contains ID3V1 tag', () => {
      const emptyView1: DataView = new DataView(new ArrayBuffer(0));
      const emptyView2: DataView = new DataView(new ArrayBuffer(125));
      const tag: ArrayBuffer = BufferUtil.createArrayBuffer('TAG');
      const tagView: DataView = new DataView(tag);
      const mockFile: DataView = BlobUtil.concatDataViews(emptyView1, tagView, emptyView2);

      expect(Id3Util.hasID3V1(mockFile)).toBeTruthy();
    });

    it('should return false if file does not contain ID3V1 tag', () => {
      const tag: ArrayBuffer = BufferUtil.createArrayBuffer('Test');
      const mockFile: DataView = new DataView(tag);

      expect(Id3Util.hasID3V1(mockFile)).toBeFalsy();
    });
  });

  describe('hasID3V2 function', () => {
    it('should return true if file contains ID3V2 tag', () => {
      const tag: ArrayBuffer = BufferUtil.createArrayBuffer('ID3', 200);
      const mockFile: DataView = new DataView(tag);

      expect(Id3Util.hasID3V2(mockFile)).toBeTruthy();
    });

    it('should return false if file does not contain ID3V2 tag', () => {
      const tag: ArrayBuffer = BufferUtil.createArrayBuffer('Test');
      const mockFile: DataView = new DataView(tag);

      expect(Id3Util.hasID3V2(mockFile)).toBeFalsy();
    });
  });

  describe('deleteID3V10 function', () => {
    beforeEach(() => {
      spyOn(fs, 'truncate').and.callFake((...args) => args[2]());
    });

    it('should return empty ID3V10 object and delete tag if it exists', async () => {
      spyOn(Id3Util, 'hasID3V1').and.returnValue(true);
      const id3: ID3V10 = await Id3Util.deleteID3V10({ path: mockPath });

      expect(fs.truncate).toHaveBeenCalled();
      expect(id3).toEqual(new ID3V10());
    });

    it('should return empty ID3V10 object, but not delete tag if it does not exist', async () => {
      spyOn(Id3Util, 'hasID3V1').and.returnValue(false);
      const id3: ID3V10 = await Id3Util.deleteID3V10({ path: mockPath });

      expect(fs.truncate).not.toHaveBeenCalled();
      expect(id3).toEqual(new ID3V10());
    });
  });

  describe('deleteID3V11 function', () => {
    beforeEach(() => {
      spyOn(fs, 'truncate').and.callFake((...args) => args[2]());
    });

    it('should return empty ID3V11 object and delete tag if it exists', async () => {
      spyOn(Id3Util, 'hasID3V1').and.returnValue(true);
      const id3: ID3V11 = await Id3Util.deleteID3V11({ path: mockPath });

      expect(fs.truncate).toHaveBeenCalled();
      expect(id3).toEqual(new ID3V11());
    });

    it('should return empty ID3V11 object, but not delete tag if it does not exist', async () => {
      spyOn(Id3Util, 'hasID3V1').and.returnValue(false);
      const id3: ID3V11 = await Id3Util.deleteID3V11({ path: mockPath });

      expect(fs.truncate).not.toHaveBeenCalled();
      expect(id3).toEqual(new ID3V11());
    });
  });
});
