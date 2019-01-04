import fs from 'fs';
import path from 'path';
import FsUtil from './fsUtil';

const mocksDir: string = path.resolve('./example_mp3');

describe('fsUtil class', () => {
  const mockPath: string = `${mocksDir}/ID3V10/id3v1_004_basic.mp3`;

  describe('readFile function', () => {
    it('should return a promise with file as a buffer', async () => {
      const mockFile: Buffer = await FsUtil.readFile(mockPath);

      expect(mockFile).toBeDefined();
    });

    it('should re-throw error in case of error', async () => {
      spyOn(fs, 'readFile').and.throwError('ERR');
      const err = FsUtil.readFile(mockPath);

      expect(err).rejects.toThrow('ERR');
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
      const err = FsUtil.writeToFile(mockPath, mockData);

      expect(err).rejects.toThrow('ERR');
    });
  });

  xdescribe('truncate function', () => {
    it('should truncate a file', () => {
      spyOn(fs, 'truncate');
      FsUtil.truncate(mockPath, 2);

      expect(fs.truncate).toHaveBeenCalled();
    });

    it('should re-throw error in case of error', async () => {
      spyOn(fs, 'truncate').and.throwError('ERR');
      const err = FsUtil.truncate(mockPath, 2);

      expect(err).rejects.toThrow('ERR');
    });
  });
});
