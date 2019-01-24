export default class Id3v2Flags {
  public unsynchronisation: boolean;
  public compression: boolean;

  constructor(unsynchronisation: boolean = false, compression: boolean = false) {
    this.unsynchronisation = unsynchronisation;
    this.compression = compression;
  }
}
