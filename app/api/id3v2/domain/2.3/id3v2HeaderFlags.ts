export default class ID3V2HeaderFlags {
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
