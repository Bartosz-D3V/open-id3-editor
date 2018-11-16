export default class {
  public readonly tagId = 'ID3';
  public version: string;
  public flags: string;
  public size: number;

  constructor(version: string, flags: string, size: number) {
    this.version = version;
    this.flags = flags;
    this.size = size;
  }
}
