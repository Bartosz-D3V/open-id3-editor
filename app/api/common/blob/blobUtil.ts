import BufferUtil from '../buffer/bufferUtil';

export default class BlobUtil {
  private static readonly cannotReadFileErrorMsg = 'Cannot read the file';

  public static blobToDataView = async <T extends Blob>(blob: T): Promise<DataView> => {
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
    for (let i = offset; i < length + offset; i++) {
      const charCode: number = dataView.getInt8(i);
      if (charCode > 31) {
        data += String.fromCharCode(charCode);
      }
    }
    return data;
  };

  public static dataViewToRawString = (
    dataView: DataView,
    offset: number,
    length: number
  ): string => {
    let data = '';
    for (let i = offset; i < length + offset; i++) {
      const charCode: number = dataView.getUint8(i);
      data += String.fromCharCode(charCode);
    }
    return data;
  };

  public static writeToDataView<T>(dataView: DataView, data: T, offset: number): DataView {
    switch (typeof data) {
      case 'string':
        return BlobUtil.writeStringToDataView(dataView, data, offset);
      case 'number':
        return BlobUtil.writeNumToDataView(dataView, data, offset);
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
    dataViews
      .map((val: DataView) => val.buffer)
      .forEach((val: ArrayBuffer) => {
        typedArr.set(new Uint8Array(val), offset);
        offset += val.byteLength;
      });
    return dataView;
  };

  public static prepareImageBlob(data: string): string {
    return '';
  }
}
