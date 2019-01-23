export default class Id3v2HeaderFlags {
  public unsynchronisation: boolean;
  public extendedHeader: boolean;
  public experimental: boolean;

  constructor(
    unsynchronisation: boolean = false,
    extendedHeader: boolean = false,
    experimental: boolean = false
  ) {
    this.unsynchronisation = unsynchronisation;
    this.extendedHeader = extendedHeader;
    this.experimental = experimental;
  }
}
