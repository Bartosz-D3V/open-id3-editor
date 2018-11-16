import ID3V2Frame from './id3V2Frame';

export default class {
  public frame: ID3V2Frame;
  public data: any;

  constructor(frame: ID3V2Frame, data: any) {
    this.frame = frame;
    this.data = data;
  }
}
