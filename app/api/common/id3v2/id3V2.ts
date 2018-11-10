import ID3V2Header from './id3V2Header';
import ID3V2FrameWrapper from './id3V2FrameWrapper';

export default class {
  public header: ID3V2Header;
  public body: Array<ID3V2FrameWrapper>;

  constructor(header: ID3V2Header, body: Array<ID3V2FrameWrapper>) {
    this.header = header;
    this.body = body;
  }
}
