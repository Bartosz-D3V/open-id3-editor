export default class BufferUtil {
  public static createArrayBuffer<T>(data: T, bufferSize?: number): ArrayBuffer {
    switch (typeof data) {
      case 'string':
        return BufferUtil.createArrayBufferFromString(data, bufferSize);
      case 'number':
        return BufferUtil.createArrayBufferFromNum(data, bufferSize);
    }
  }

  private static createArrayBufferFromString(text: string, bufferSize?: number): ArrayBuffer {
    const buffer: ArrayBuffer = new ArrayBuffer(bufferSize || text.length);
    const bufView: Uint8Array = new Uint8Array(buffer);
    for (let i = 0, strLen = text.length; i < strLen; i++) {
      bufView[i] = text.charCodeAt(i);
    }
    return buffer;
  }

  private static createArrayBufferFromNum(num: number, bufferSize?: number): ArrayBuffer {
    const buffer: ArrayBuffer = new ArrayBuffer(bufferSize || 8);
    const bufView: Uint8Array = new Uint8Array(buffer);
    let tmpNum = num;
    for (let i = 0; i < bufView.length; i++) {
      const byte = tmpNum & 0xff;
      bufView[i] = byte;
      tmpNum = (num - byte) / 256;
    }
    return buffer;
  }

  public static decodeArrayBuffer(buffer: ArrayBuffer): string {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  public static decodeTypedArray(typedArr: TypedArray): string {
    return String.fromCharCode.apply(null, typedArr);
  }

  public static decodeArrayBufferFromNum(buffer: ArrayBuffer): number {
    const bufView: Uint8Array = new Uint8Array(buffer);
    let value = 0;
    for (let i = bufView.length - 1; i >= 0; i--) {
      value = value * 256 + bufView[i];
    }

    return value;
  }

  public static concatTypedArrays(...typedArrays: Array<TypedArray>): TypedArray {
    const typedArrSize: number = BufferUtil.getTypedArrSize(...typedArrays);
    const combinedTypedArr: TypedArray = new Uint8Array(typedArrSize);
    let offset = 0;
    typedArrays.forEach((val: TypedArray) => {
      combinedTypedArr.set(new Uint8Array(val), offset);
      offset += val.byteLength;
    });
    return combinedTypedArr;
  }

  public static getBufferSize(...arrBuffers: Array<ArrayBuffer>): number {
    return arrBuffers
      .map((val: ArrayBuffer) => val.byteLength)
      .reduce((prev: number, next: number) => prev + next, 0);
  }

  public static getTypedArrSize(...typedArrays: Array<TypedArray>): number {
    return typedArrays
      .map((val: TypedArray) => val.byteLength)
      .reduce((prev: number, next: number) => prev + next, 0);
  }
}
