import ID3V2Header from './id3v2Header';
import Id3v2Frame from './id3v2Frame';

export default class {
  public header: ID3V2Header;
  public body: Array<Id3v2Frame>;

  constructor(header: ID3V2Header, body: Array<Id3v2Frame>) {
    this.header = header;
    this.body = body;
  }
}
