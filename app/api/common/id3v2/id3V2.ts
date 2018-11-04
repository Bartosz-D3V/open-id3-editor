import ID3V2Header from 'id3V2Header';
import ID3V2Frame from 'id3V2Frame';

export default class {
  public header: ID3V2Header;
  public body: Array<ID3V2Frame>;

  constructor(header: ID3V2Header, body: Array<ID3V2Frame>) {
    this.header = header;
    this.body = body;
  }
}
