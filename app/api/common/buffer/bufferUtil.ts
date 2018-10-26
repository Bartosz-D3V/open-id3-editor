export default class BufferUtil {
  private static readonly tooSmallArrayBufferSize = 'Buffer size cannot be less than size of text';

  public static createArrayBuffer<T>(data: T, bufferSize?: number): ArrayBuffer {
    const text = data.toString();
    const buffer: ArrayBuffer = new ArrayBuffer(bufferSize || text.length);
    const bufView: Uint8Array = new Uint8Array(buffer);
    for (let i = 0, strLen = text.length; i < strLen; i++) {
      bufView[i] = text.charCodeAt(i);
    }
    return buffer;
  }

  public static decodeArrayBuffer(buffer: ArrayBuffer): string {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  public static decodeTypedArray(typedArr: TypedArray): string {
    return String.fromCharCode.apply(null, typedArr);
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
