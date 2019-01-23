import { FrameID } from './frameID';
import ID3V2FrameFlags from './id3v2FrameFlags';

export default class {
  public frameID: FrameID | string;
  public size: number;
  public flags: ID3V2FrameFlags;

  constructor(frameID: FrameID | string, size?: number, flags?: ID3V2FrameFlags) {
    this.frameID = frameID;
    this.size = size;
    this.flags = flags;
  }
}
