import ID3V2HeaderFlags from './id3v2HeaderFlags';

export default class ID3V2Header {
  public readonly tagId = 'ID3';
  public readonly version: string;
  public flags: ID3V2HeaderFlags;
  public size: number;

  constructor(version: string, flags: ID3V2HeaderFlags, size: number) {
    this.version = version;
    this.flags = flags;
    this.size = size;
  }
}
