import ID3V2FrameFlags from './id3v2FrameFlags';

export default class {
  public frameID: string;
  public size: number;
  public flags: ID3V2FrameFlags;
  public data: string;

  constructor(frameID: string, flags: ID3V2FrameFlags, data: string, size?: number) {
    this.frameID = frameID;
    this.size = size ? size : data.length;
    this.flags = flags;
    this.data = data;
  }
}
