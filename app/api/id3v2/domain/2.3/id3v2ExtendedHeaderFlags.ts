export default class ID3V2ExtendedHeaderFlags {
  public crcDataPresent: boolean;

  constructor(crcDataPresent: boolean = false) {
    this.crcDataPresent = crcDataPresent;
  }
}
