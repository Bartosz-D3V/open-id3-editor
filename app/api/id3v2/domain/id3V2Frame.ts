import { FrameID } from './frameID';
import Id3v2Flags from './id3v2Flags';

export default class {
  public frameID: FrameID | string;
  public size: number;
  public flags: Id3v2Flags;

  constructor(frameID: FrameID | string, size: number, flags: Id3v2Flags) {
    this.frameID = frameID;
    this.size = size;
    this.flags = flags;
  }
}
