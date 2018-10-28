import fs from 'fs';

export default class FsUtil {
  public static readFile = (path: fs.PathLike): Promise<Buffer> => {
    return new Promise((res, rej) => {
      fs.readFile(path, (err, data) => {
        if (err) {
          rej(err);
        } else {
          res(data);
        }
      });
    });
  };
}
