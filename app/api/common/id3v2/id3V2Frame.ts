import FrameID from 'frameID';

export default class {
  public frameID: FrameID;
  public size: number;
  public flags: string;

  constructor(frameID: FrameID, size: number, flags: string) {
    this.frameID = frameID;
    this.size = size;
    this.flags = flags;
  }
}
