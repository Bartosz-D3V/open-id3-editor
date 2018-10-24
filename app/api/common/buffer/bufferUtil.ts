import { AssertionError } from 'assert';

export default class BufferUtil {
  private static readonly tooSmallArrayBufferSize = 'Buffer size cannot be less than size of text';

  public static createArrayBuffer<T>(data: T, bufferSize?: number): ArrayBuffer {
    const text = data.toString();
    if (bufferSize && text.length * 2 > bufferSize) {
      throw new AssertionError({
        message: BufferUtil.tooSmallArrayBufferSize,
      });
    }
    const buffer: ArrayBuffer = new ArrayBuffer(bufferSize || text.length * 2);
    const bufView: Uint16Array = new Uint16Array(buffer);
    for (let i = 0, strLen = text.length; i < strLen; i++) {
      bufView[i] = text.charCodeAt(i);
    }
    return buffer;
  }

  public static decodeArrayBuffer(buffer: ArrayBuffer): string {
    return String.fromCharCode.apply(null, new Uint16Array(buffer));
  }

  public static decodeTypedArray(typedArr: TypedArray): string {
    return String.fromCharCode.apply(null, typedArr);
  }

  public static concatTypedArrays(...typedArrays: Array<TypedArray>): TypedArray {
    const combinedTypedArrSize: number = typedArrays
      .map((val: TypedArray) => val.byteLength)
      .reduce((prev: number, next: number) => prev + next, 0);
    const combinedTypedArr: TypedArray = new Uint16Array(combinedTypedArrSize);
    let offset = 0;
    typedArrays.forEach((val: TypedArray) => {
      combinedTypedArr.set(new Uint16Array(val), offset);
      offset += val.byteLength;
    });
    return combinedTypedArr;
  }
}
