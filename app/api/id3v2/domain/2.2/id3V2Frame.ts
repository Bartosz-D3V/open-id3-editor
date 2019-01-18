import { FrameID } from './frameID';

export default class {
  public frameID: FrameID | string;
  public size: number;

  constructor(frameID: FrameID | string, size: number) {
    this.frameID = frameID;
    this.size = size;
  }
}
