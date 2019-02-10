import ID3V2Header from './id3v2Header';
import ID3V2Frame from './id3v2Frame';
import ID3V2ExtendedHeader from './id3v2ExtendedHeader';

export default class ID3V2 {
  public header: ID3V2Header;
  public extendedHeader?: ID3V2ExtendedHeader;
  public body: Array<ID3V2Frame>;

  constructor(header: ID3V2Header, body: Array<ID3V2Frame>, extendedHeader?: ID3V2ExtendedHeader) {
    this.header = header;
    this.extendedHeader = extendedHeader;
    this.body = body;
  }
}
