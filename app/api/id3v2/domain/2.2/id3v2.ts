import ID3V2Header from './id3v2Header';
import ID3V2Frame from './id3v2Frame';

export default class {
  public header: ID3V2Header;
  public body: Array<ID3V2Frame>;

  constructor(header: ID3V2Header, body: Array<ID3V2Frame>) {
    this.header = header;
    this.body = body;
  }

  public recalculateSize(): void {
    let size = this.header.size;
    this.body.forEach(frame => {
      size += frame.size;
    });
    this.header.size = size;
  }
}
