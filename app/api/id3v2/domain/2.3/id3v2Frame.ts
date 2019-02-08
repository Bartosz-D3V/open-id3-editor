import ID3V2FrameFlags from './id3v2FrameFlags';
import APICFrame from './apicFrame';

export default class {
  public frameID: string;
  public size: number;
  public flags: ID3V2FrameFlags;
  public data: string | APICFrame;

  constructor(frameID: string, flags: ID3V2FrameFlags, data: string, size: number) {
    this.frameID = frameID;
    this.size = size;
    this.flags = flags;
    this.data = data;
  }
}
