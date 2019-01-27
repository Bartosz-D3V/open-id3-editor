import { FrameID } from './frameID';
import ID3V2FrameFlags from './id3v2FrameFlags';

export default class {
  public frameID: FrameID | string;
  public size: number;
  public flags: ID3V2FrameFlags;
  public data: string;

  constructor(frameID: FrameID | string, flags: ID3V2FrameFlags, data: string) {
    this.frameID = frameID;
    this.size = data.length;
    this.flags = flags;
    this.data = data;
  }
}
