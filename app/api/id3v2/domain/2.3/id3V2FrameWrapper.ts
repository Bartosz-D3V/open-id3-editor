import ID3V2Frame from './id3V2Frame';

export default class ID3V2FrameWrapper {
  public frame: ID3V2Frame;
  public data: string;

  constructor(frame: ID3V2Frame, data: string) {
    this.frame = frame;
    this.data = data;
  }
}
