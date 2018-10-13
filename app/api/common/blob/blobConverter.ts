export default class BlobConverter {
  private static cannotReadFileErrorMsg = 'Cannot read the file';
  private static incorrectBase64ErrorMsg = 'Incorrect Base64 encoding';

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
        reject(new ReferenceError(BlobConverter.cannotReadFileErrorMsg));
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
        reject(new ReferenceError(BlobConverter.cannotReadFileErrorMsg));
      };
    });
  };

  public static decodeDataURL = (dataURL: string): string => {
    const dataNoMIME: string = dataURL.split(',')[1];
    let decodedData: string;
    try {
      decodedData = window.atob(dataNoMIME);
    } catch (e) {
      throw new ReferenceError(BlobConverter.incorrectBase64ErrorMsg);
    }
    return decodedData;
  };
}
