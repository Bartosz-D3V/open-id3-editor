export default class BlobUtil {
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
        reject(new ReferenceError(BlobUtil.cannotReadFileErrorMsg));
      };
    });
  };

  public static blobToDataView = async (blob: Blob): Promise<DataView> => {
    const fileReader: FileReader = new FileReader();
    let dataView: DataView;
    fileReader.readAsArrayBuffer(blob);
    return new Promise<DataView>((resolve: Function, reject: Function) => {
      fileReader.onload = () => {
        dataView = new DataView(<ArrayBuffer>fileReader.result);
        resolve(dataView);
      };

      fileReader.onerror = () => {
        fileReader.abort();
        reject(new ReferenceError(BlobUtil.cannotReadFileErrorMsg));
      };
    });
  };

  public static dataViewToString = (dataView: DataView, offset: number, length: number): string => {
    let data = '';
    for (let i = offset; i < offset + length; i++) {
      const charCode: number = dataView.getInt8(i);
      if (charCode > 31) {
        data += String.fromCharCode(charCode);
      }
    }
    return data;
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
        reject(new ReferenceError(BlobUtil.cannotReadFileErrorMsg));
      };
    });
  };

  public static decodeDataURL = (dataURL: string): string => {
    const dataNoMIME: string = dataURL.split(',')[1];
    let decodedData: string;
    try {
      decodedData = window.atob(dataNoMIME);
    } catch (e) {
      throw new ReferenceError(BlobUtil.incorrectBase64ErrorMsg);
    }
    return decodedData;
  };
}
