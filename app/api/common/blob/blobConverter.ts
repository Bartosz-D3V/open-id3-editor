export default class BlobConverter {
  private static errorMsg = 'Cannot read the file';

  public static blobToArrayBuffer = async (blob: Blob): Promise<ArrayBuffer> => {
    const fileReader: FileReader = new FileReader();
    let arrayBuffer: ArrayBuffer;
    fileReader.readAsArrayBuffer(blob);
    return new Promise<ArrayBuffer>((resolve: Function, reject: Function) => {
      fileReader.onload = () => {
        arrayBuffer = <ArrayBuffer>fileReader.result;
        resolve(arrayBuffer);
      };

      fileReader.onerror = () => {
        fileReader.abort();
        reject(new ReferenceError(BlobConverter.errorMsg));
      };
    });
  };

  public static blobToDataURL = async (blob: Blob): Promise<string> => {
    const fileReader: FileReader = new FileReader();
    let dataURL: string;
    fileReader.readAsDataURL(blob);

    return new Promise<string>((resolve: Function, reject: Function) => {
      fileReader.onload = () => {
        dataURL = <string>fileReader.result;
        resolve(dataURL);
      };

      fileReader.onerror = () => {
        fileReader.abort();
        reject(new ReferenceError(BlobConverter.errorMsg));
      };
    });
  };
}
