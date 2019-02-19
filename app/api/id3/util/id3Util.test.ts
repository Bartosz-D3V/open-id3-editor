import fs from 'fs';
import path from 'path';
import ID3Util from './id3Util';
import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V10 from '@api/id3v1/domain/id3V1-0';
import ID3V11 from '@api/id3v1/domain/id3V1-1';
import ID3V23 from '@api/id3v2/domain/2.3/id3v2';
import ID3V23Frame from '@api/id3v2/domain/2.3/id3v2Frame';
import ID3V23FrameFlags from '@api/id3v2/domain/2.3/id3v2FrameFlags';
import ID3V23Header from '@api/id3v2/domain/2.3/id3v2Header';
import ID3V23HeaderFlags from '@api/id3v2/domain/2.3/id3v2HeaderFlags';
import ID3V23ExtendedHeaderFlags from '@api/id3v2/domain/2.3/id3v2ExtendedHeaderFlags';
import FsUtil from '@api/common/fs/fsUtil';
import Genre from '../domain/genre';
import Id3v2ExtendedHeader from '@api/id3v2/domain/2.3/id3v2ExtendedHeader';

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

      expect(ID3Util.hasID3V1(mockFile)).toBeTruthy();
    });

    it('should return false if file does not contain ID3V1 tag', () => {
      const tag: ArrayBuffer = BufferUtil.createArrayBuffer('Test');
      const mockFile: DataView = new DataView(tag);

      expect(ID3Util.hasID3V1(mockFile)).toBeFalsy();
    });
  });

  describe('hasID3V2 function', () => {
    it('should return true if file contains ID3V2 tag', () => {
      const tag: ArrayBuffer = BufferUtil.createArrayBuffer('ID3', 200);
      const mockFile: DataView = new DataView(tag);

      expect(ID3Util.hasID3V2(mockFile)).toBeTruthy();
    });

    it('should return false if file does not contain ID3V2 tag', () => {
      const tag: ArrayBuffer = BufferUtil.createArrayBuffer('Test');
      const mockFile: DataView = new DataView(tag);

      expect(ID3Util.hasID3V2(mockFile)).toBeFalsy();
    });
  });

  describe('deleteID3V10 function', () => {
    beforeEach(() => {
      spyOn(fs, 'truncate').and.callFake((...args) => args[2]());
    });

    it('should return empty ID3V10 object and delete tag if it exists', async () => {
      spyOn(ID3Util, 'hasID3V1').and.returnValue(true);
      const id3: ID3V10 = await ID3Util.deleteID3V10({ path: mockPath });

      expect(fs.truncate).toHaveBeenCalled();
      expect(id3).toEqual(new ID3V10());
    });

    it('should return empty ID3V10 object, but not delete tag if it does not exist', async () => {
      spyOn(ID3Util, 'hasID3V1').and.returnValue(false);
      const id3: ID3V10 = await ID3Util.deleteID3V10({ path: mockPath });

      expect(fs.truncate).not.toHaveBeenCalled();
      expect(id3).toEqual(new ID3V10());
    });
  });

  describe('deleteID3V11 function', () => {
    beforeEach(() => {
      spyOn(fs, 'truncate').and.callFake((...args) => args[2]());
    });

    it('should return empty ID3V11 object and delete tag if it exists', async () => {
      spyOn(ID3Util, 'hasID3V1').and.returnValue(true);
      const id3: ID3V11 = await ID3Util.deleteID3V11({ path: mockPath });

      expect(fs.truncate).toHaveBeenCalled();
      expect(id3).toEqual(new ID3V11());
    });

    it('should return empty ID3V11 object, but not delete tag if it does not exist', async () => {
      spyOn(ID3Util, 'hasID3V1').and.returnValue(false);
      const id3: ID3V11 = await ID3Util.deleteID3V11({ path: mockPath });

      expect(fs.truncate).not.toHaveBeenCalled();
      expect(id3).toEqual(new ID3V11());
    });
  });

  describe('deleteID3V23 function', () => {
    const emptyID3V2: ID3V23 = new ID3V23(new ID3V23Header(3, new ID3V23HeaderFlags(), 0), []);

    beforeEach(() => {
      spyOn(BlobUtil, 'blobToDataView');
      spyOn(FsUtil, 'deleteFromBeginning');
    });

    it('should return empty ID3V2 object and delete tag if it exists', async () => {
      spyOn(ID3Util, 'hasID3V2').and.returnValue(true);
      const id3: ID3V23 = await ID3Util.deleteID3V23({ size: 222, path: mockPath }, 2);

      expect(FsUtil.deleteFromBeginning).toHaveBeenCalled();
      expect(id3).toEqual(emptyID3V2);
    });

    it('should return empty ID3V2 object, but not delete tag if it does not exist', async () => {
      spyOn(ID3Util, 'hasID3V2').and.returnValue(false);
      const id3: ID3V23 = await ID3Util.deleteID3V23({ size: 222, path: mockPath }, 2);

      expect(FsUtil.deleteFromBeginning).not.toHaveBeenCalled();
      expect(id3).toEqual(emptyID3V2);
    });
  });

  describe('convertIndexToGenre function', () => {
    it('should return Genre object from a given index', () => {
      expect(ID3Util.convertIndexToGenre(0)).toEqual(new Genre(0, 'Blues'));
      expect(ID3Util.convertIndexToGenre(8)).toEqual(new Genre(8, 'Jazz'));
      expect(ID3Util.convertIndexToGenre(16)).toEqual(new Genre(16, 'Reggae'));
      expect(ID3Util.convertIndexToGenre(56)).toEqual(new Genre(56, 'Southern Rock'));
    });

    it('should return undefined for unrecognized tag index', () => {
      expect(ID3Util.convertIndexToGenre(180)).toBeUndefined();
      expect(ID3Util.convertIndexToGenre(200)).toBeUndefined();
      expect(ID3Util.convertIndexToGenre(210)).toBeUndefined();
      expect(ID3Util.convertIndexToGenre(220)).toBeUndefined();
    });
  });

  describe('findFrame function', () => {
    let id3: ID3V23;

    beforeEach(() => {
      id3 = new ID3V23(new ID3V23Header(3, new ID3V23HeaderFlags(), 0), []);
    });

    it('should return found frame', () => {
      const frame: ID3V23Frame = new ID3V23Frame('COMM', new ID3V23FrameFlags(), 'Comment', 7);
      id3.body.push(frame);

      expect(ID3Util.findFrame(id3, 'COMM')).toEqual(frame);
    });

    it('should return undefined if frame was not found', () => {
      expect(ID3Util.findFrame(id3, 'PCNT')).toBeUndefined();
    });
  });

  describe('updateFrame function', () => {
    let id3: ID3V23;

    beforeEach(() => {
      id3 = new ID3V23(
        new ID3V23Header(3, new ID3V23HeaderFlags(), 0),
        [],
        new Id3v2ExtendedHeader(20, new ID3V23ExtendedHeaderFlags(), 1)
      );
    });

    it('should update frame if it exists', () => {
      const frame1: ID3V23Frame = new ID3V23Frame('COMM', new ID3V23FrameFlags(), 'Comment', 7);
      const frame2: ID3V23Frame = new ID3V23Frame(
        'COMM',
        new ID3V23FrameFlags(),
        'Updated comment',
        15
      );
      id3.body.push(frame1);
      id3 = ID3Util.updateFrame(id3, frame2);

      expect(id3.body.length).toEqual(1);
      expect(id3.body[0].frameID).toEqual(frame2.frameID);
      expect(id3.body[0].flags).toEqual(frame2.flags);
      expect(id3.body[0].data).toEqual(frame2.data);
      expect(id3.body[0].size).toEqual(frame2.size);
    });

    it('should add frame if it does not exist', () => {
      const frame1: ID3V23Frame = new ID3V23Frame('COMM', new ID3V23FrameFlags(), 'Comment', 7);
      id3 = ID3Util.updateFrame(id3, frame1);

      expect(id3.body.length).toEqual(1);
      expect(id3.body[0].frameID).toEqual(frame1.frameID);
      expect(id3.body[0].flags).toEqual(frame1.flags);
      expect(id3.body[0].data).toEqual(frame1.data);
      expect(id3.body[0].size).toEqual(frame1.size);
    });
  });
});
