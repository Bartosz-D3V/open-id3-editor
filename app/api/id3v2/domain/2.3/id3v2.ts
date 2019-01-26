import ID3V2Header from './id3v2Header';
import Id3v2FrameWrapper from './id3v2FrameWrapper';

export default class {
  public header: ID3V2Header;
  public body: Array<Id3v2FrameWrapper>;

  constructor(header: ID3V2Header, body: Array<Id3v2FrameWrapper>) {
    this.header = header;
    this.body = body;
  }
}
