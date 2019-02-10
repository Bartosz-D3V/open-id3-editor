import ID3V2ExtendedHeaderFlags from './id3v2ExtendedHeaderFlags';

export default class ID3V2ExtendedHeader {
  public size: number;
  public flags: ID3V2ExtendedHeaderFlags;
  public paddingSize: number;

  constructor(size: number, flags: ID3V2ExtendedHeaderFlags, paddingSize: number) {
    this.size = size;
    this.flags = flags;
    this.paddingSize = paddingSize;
  }
}
