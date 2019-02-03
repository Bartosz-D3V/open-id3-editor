export default class Id3v2ExtendedHeaderFlags {
  public crcDataPresent: boolean;

  constructor(crcDataPresent: boolean = false) {
    this.crcDataPresent = crcDataPresent;
  }
}
