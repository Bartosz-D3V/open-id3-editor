import fs, { Stats } from 'fs';
import util from 'util';
import BufferUtil from '@api/common/buffer/bufferUtil';

export default class FsUtil {
  public static readFile = async (path: fs.PathLike): Promise<Buffer> => {
    return new Promise<Buffer>((resolve, reject) => {
      fs.readFile(path, (err: any, data: Buffer) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
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
