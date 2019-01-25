import ID3V2Frame from './id3v2Frame';

export default class Id3v2FrameWrapper {
  public frame: ID3V2Frame;
  public data: string;

  constructor(frame: ID3V2Frame, data: string) {
    this.frame = frame;
    this.data = data;
  }
}
