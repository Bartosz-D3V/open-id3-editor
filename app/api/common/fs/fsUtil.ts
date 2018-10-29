import fs from 'fs';

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
}
