import util from 'util';
import fs, { Stats } from 'fs';

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
      const fileData: Buffer = await util.promisify(fs.readFile)(path);
      const newData: Buffer = Buffer.concat([new Buffer(data.buffer), fileData]);
      await util.promisify(fs.writeFile)(path, newData);
    } catch (error) {
      throw error;
    }
  };

  public static truncate = async (path: string, length: number): Promise<void> => {
    try {
      const stats: Stats = await util.promisify(fs.stat)(path);
      const newFileSize = stats.size - length;
      await util.promisify(fs.truncate)(path, newFileSize);
    } catch (error) {
      throw error;
    }
  };

  public static deleteFromBeginning = async (path: string, length: number): Promise<void> => {
    try {
      const data: Buffer = await util.promisify(fs.readFile)(path);
      const newData: Buffer = data.slice(length, data.byteLength);
      await util.promisify(fs.writeFile)(path, newData);
    } catch (error) {
      throw error;
    }
  };
}
