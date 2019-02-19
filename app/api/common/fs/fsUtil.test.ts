import fs, { Stats } from 'fs';
import path from 'path';
import util from 'util';
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

    it('should append a file by writing data at the beginning', async () => {
      spyOn(fs, 'writeFile').and.callFake((...args) => args[2]());
      const data: Buffer = await util.promisify(fs.readFile)(mockPath);
      const newData: Buffer = Buffer.concat([Buffer.from(mockData.buffer), data]);
      await FsUtil.writeToFile(mockPath, mockData);

      expect(fs.writeFile).toHaveBeenCalledWith(mockPath, newData, expect.any(Function));
    });

    it('should re-throw error in case of error', async () => {
      spyOn(fs, 'writeFile').and.throwError('ERR');
      let err;
      try {
        await FsUtil.writeToFile(mockPath, mockData);
      } catch (e) {
        err = e;
      }

      expect(err).toEqual(new Error('ERR'));
    });
  });

  describe('appendToFile function', () => {
    const buff: ArrayBuffer = new ArrayBuffer(2);
    const mockData: DataView = new DataView(buff);

    it('should append a file by writing data in the end', async () => {
      spyOn(fs, 'appendFile').and.callFake((...args) => args[2]());
      await FsUtil.appentToFile(mockPath, mockData);

      expect(fs.appendFile).toHaveBeenCalledWith(mockPath, Buffer.from(buff), expect.any(Function));
    });

    it('should re-throw error in case of error', async () => {
      spyOn(fs, 'writeFile').and.throwError('ERR');
      let err;
      try {
        await FsUtil.appentToFile(mockPath, mockData);
      } catch (e) {
        err = e;
      }

      expect(err).toEqual(new Error('ERR'));
    });
  });

  describe('truncate function', () => {
    it('should truncate a file', async () => {
      spyOn(fs, 'truncate').and.callFake((...args) => args[2]());
      const data: Buffer = await util.promisify(fs.readFile)(mockPath);
      await FsUtil.truncate(mockPath, 2);

      expect(fs.truncate).toHaveBeenCalledWith(mockPath, data.byteLength - 2, expect.any(Function));
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

  describe('deleteFromBeginning function', () => {
    it('should remove beginning of the file', async () => {
      spyOn(fs, 'writeFile').and.callFake((...args) => args[2]());
      const stats: Stats = await util.promisify(fs.stat)(mockPath);
      const data: Buffer = await util.promisify(fs.readFile)(mockPath);
      const newData = data.slice(20, stats.size);
      await FsUtil.deleteFromBeginning(mockPath, 20);

      expect(fs.writeFile).toHaveBeenCalledWith(mockPath, newData, expect.any(Function));
    });

    it('should re-throw error in case of error', async () => {
      spyOn(fs, 'writeFile').and.throwError('ERR');
      let err;
      try {
        await FsUtil.deleteFromBeginning(mockPath, 20);
      } catch (e) {
        err = e;
      }

      expect(err).toEqual(new Error('ERR'));
    });
  });
});
