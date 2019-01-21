import { FrameID } from './frameID';
import FrameHeaderFlags from './frameHeaderFlags';

export default class {
  public frameID: FrameID | string;
  public size: number;
  public flags: FrameHeaderFlags;

  constructor(frameID: FrameID | string, size?: number, flags?: FrameHeaderFlags) {
    this.frameID = frameID;
    this.size = size;
    this.flags = flags;
  }
}
