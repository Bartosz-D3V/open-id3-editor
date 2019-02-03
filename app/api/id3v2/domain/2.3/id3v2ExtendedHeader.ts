import Id3v2ExtendedHeaderFlags from './id3v2ExtendedHeaderFlags';

export default class Id3v2ExtendedHeader {
  public size: number;
  public flags: Id3v2ExtendedHeaderFlags;
  public paddingSize: number;

  constructor(size: number, flags: Id3v2ExtendedHeaderFlags, paddingSize: number) {
    this.size = size;
    this.flags = flags;
    this.paddingSize = paddingSize;
  }
}
