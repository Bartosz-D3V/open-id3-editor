import ID3V2FrameFlags from './id3v2FrameFlags';
import APICFrame from './apicFrame';

export default class {
  public frameID: string;
  public size: number;
  public flags: ID3V2FrameFlags;
  public data: any;

  constructor(frameID: string, flags: ID3V2FrameFlags, data: string | APICFrame, size: number) {
    this.frameID = frameID;
    this.size = size;
    this.flags = flags;
    this.data = data;
  }
}
