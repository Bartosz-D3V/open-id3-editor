import ID3V2Header from './id3v2Header';
import Id3v2Frame from './id3v2Frame';
import Id3v2ExtendedHeader from './id3v2ExtendedHeader';

export default class {
  public header: ID3V2Header;
  public extendedHeader?: Id3v2ExtendedHeader;
  public body: Array<Id3v2Frame>;

  constructor(header: ID3V2Header, body: Array<Id3v2Frame>, extendedHeader?: Id3v2ExtendedHeader) {
    this.header = header;
    this.extendedHeader = extendedHeader;
    this.body = body;
  }
}
