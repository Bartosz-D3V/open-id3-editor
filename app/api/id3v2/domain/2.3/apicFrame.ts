export default class APICFrame {
  public textEncoding: number;
  public mimeType: string;
  public pictureType: string;
  public description: string;
  public rawData: string;

  constructor(
    textEncoding: number,
    mimeType: string,
    pictureType: string,
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
