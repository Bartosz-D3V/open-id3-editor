import { AssertionError } from 'assert';

export default class BufferUtil {
  private static readonly tooSmallArrayBufferSize = 'Buffer size cannot be less than size of text';

  public static createArrayBuffer(text: string, bufferSize?: number): ArrayBuffer {
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
}
