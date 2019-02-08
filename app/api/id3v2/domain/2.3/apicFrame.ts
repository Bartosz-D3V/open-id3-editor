export default class APICFrame {
  public textEncoding: number;
  public mimeType: string;
  public pictureType: number;
  public description: string;
  public rawData: string;

  constructor(
    textEncoding: number,
    mimeType: string,
    pictureType: number,
    description: string,
    rawData: string
  ) {
    this.textEncoding = textEncoding;
    this.mimeType = mimeType;
    this.pictureType = pictureType;
    this.description = description;
    this.rawData = rawData;
  }
}
