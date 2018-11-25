import BufferUtil from '../buffer/bufferUtil';

export default class BlobUtil {
  private static readonly cannotReadFileErrorMsg = 'Cannot read the file';
  private static readonly incorrectBase64ErrorMsg = 'Incorrect Base64 encoding';

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

  public static writeToDataView<T>(dataView: DataView, data: T, offset: number): DataView {
    switch (typeof data) {
      case 'string':
        return BlobUtil.writeStringToDataView(dataView, data, offset);
      case 'number':
        return BlobUtil.writeNumToDataView(dataView, data, offset);
      case 'boolean':
        return BlobUtil.writeBoolToDataView(dataView, data, offset);
    }
  }

  private static writeStringToDataView(dataView: DataView, data: string, offset: number): DataView {
    const encodedTxt: Uint8Array = BlobUtil.stringToUint8(data);
    let i = offset;
    for (let j = 0; j < encodedTxt.length; j++) {
      dataView.setInt8(i, encodedTxt[j]);
      i++;
    }
    return dataView;
  }

  private static writeNumToDataView(dataView: DataView, data: number, offset: number): DataView {
    dataView.setInt8(offset, data);
    return dataView;
  }

  private static writeBoolToDataView(dataView: DataView, data: boolean, offset: number): DataView {
    dataView.setInt8(offset, +data);
    return dataView;
  }

  public static dataViewToNum = (dataView: DataView, offset: number): number =>
    dataView.getInt8(offset);

  public static stringToUint8 = (data: string): Uint8Array => {
    const arr: Array<number> = [];
    for (let i = 0; i < data.length; i++) {
      arr.push(data.charCodeAt(i));
    }
    return Uint8Array.from(arr);
  };

  public static concatDataViews = (...dataViews: Array<DataView>): DataView => {
    const buffSize: number = BufferUtil.getBufferSize(
      ...dataViews.map((val: DataView) => val.buffer)
    );
    const buffer = new ArrayBuffer(buffSize);
    const typedArr: TypedArray = new Uint8Array(buffer);
    const dataView: DataView = new DataView(buffer);
    let offset = 0;
    dataViews.map((val: DataView) => val.buffer).forEach((val: ArrayBuffer) => {
      typedArr.set(new Uint8Array(val), offset);
      offset += val.byteLength;
    });
    return dataView;
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
