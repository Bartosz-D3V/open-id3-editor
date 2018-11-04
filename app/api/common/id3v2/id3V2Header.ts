export default class {
  public readonly tagId = 'ID3';
  public version: number;
  public flags: string;
  public size: number;

  constructor(version: number, flags: string, size: number) {
    this.version = version;
    this.flags = flags;
    this.size = size;
  }
}
