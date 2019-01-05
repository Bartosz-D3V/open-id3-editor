import fs from 'fs';
import path from 'path';
import FsUtil from './fsUtil';

const mp3Dir: string = path.resolve('./example_mp3');

describe('fsUtil class', () => {
  const mockPath = `${mp3Dir}/ID3V10/id3v1_004_basic.mp3`;

  describe('readFile function', () => {
    it('should return a promise with file as a buffer', async () => {
      const mockFile: Buffer = await FsUtil.readFile(mockPath);

      expect(mockFile).toBeDefined();
    });

    it('should re-throw error in case of error', async () => {
      spyOn(fs, 'readFile').and.throwError('ERR');
      let err;
      try {
        await FsUtil.readFile(mockPath);
      } catch (e) {
        err = e;
      }

      expect(err).toEqual(new Error('ERR'));
    });
  });

  describe('writeToFile function', () => {
    const mockData: DataView = new DataView(new ArrayBuffer(2));

    it('should append a file', () => {
      spyOn(fs, 'appendFile');
      FsUtil.writeToFile(mockPath, mockData);

      expect(fs.appendFile).toHaveBeenCalled();
    });

    it('should re-throw error in case of error', async () => {
      spyOn(fs, 'appendFile').and.throwError('ERR');
      let err;
      try {
        await FsUtil.writeToFile(mockPath, mockData);
      } catch (e) {
        err = e;
      }

      expect(err).toEqual(new Error('ERR'));
    });
  });

  describe('truncate function', () => {
    it('should truncate a file', async () => {
      spyOn(fs, 'truncate').and.callFake((...args) => args[2]());
      await FsUtil.truncate(mockPath, 2);

      expect(fs.truncate).toHaveBeenCalled();
    });

    it('should re-throw error in case of error', async () => {
      spyOn(fs, 'truncate').and.throwError('ERR');
      let err;
      try {
        await FsUtil.truncate(mockPath, 2);
      } catch (e) {
        err = e;
      }

      expect(err).toEqual(new Error('ERR'));
    });
  });
});
