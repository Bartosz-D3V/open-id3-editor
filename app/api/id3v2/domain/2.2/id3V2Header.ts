import ID3V2Flags from './id3v2Flags';

export default class {
  public readonly tagId = 'ID3';
  public readonly version: string;
  public flags: ID3V2Flags;
  public size: number;

  constructor(version: string, flags: ID3V2Flags, size: number) {
    this.version = version;
    this.flags = flags;
    this.size = size;
  }
}
