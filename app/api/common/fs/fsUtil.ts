import util from 'util';
import fs, { Stats } from 'fs';
import BufferUtil from '@api/common/buffer/bufferUtil';

export default class FsUtil {
  public static readFile = async (path: fs.PathLike): Promise<Buffer> => {
    try {
      return util.promisify(fs.readFile)(path);
    } catch (error) {
      throw error;
    }
  };

  public static writeToFile = async (path: string, data: DataView): Promise<void> => {
    try {
      const buffer = BufferUtil.arrayBufferToBuffer(data.buffer);
      await util.promisify(fs.appendFile)(path, buffer);
    } catch (error) {
      throw error;
    }
  };

  public static truncate = async (path: string, length: number): Promise<void> => {
    try {
      const stats: Stats = await util.promisify(fs.stat)(path);
      const fileSize: number = stats.size;
      const newFileSize = fileSize - length;
      await util.promisify(fs.truncate)(path, newFileSize);
    } catch (error) {
      throw error;
    }
  };
}
