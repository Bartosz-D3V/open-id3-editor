export default class StringUtil {
  public static getByteAt = (text: string, offset: number): number =>
    text.charCodeAt(offset) & 0xff;
}
