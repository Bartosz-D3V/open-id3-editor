export default class Id3v2HeaderFlags {
  public unsynchronisation: boolean;
  public compression: boolean;

  constructor(unsynchronisation: boolean = false, compression: boolean = false) {
    this.unsynchronisation = unsynchronisation;
    this.compression = compression;
  }
}
