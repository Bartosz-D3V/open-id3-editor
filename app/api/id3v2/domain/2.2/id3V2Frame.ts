import { FrameID } from './frameID';

export default class {
  public frameID: FrameID | string;
  public size: number;
  public data: string;

  constructor(frameID: FrameID | string, data: string) {
    this.frameID = frameID;
    this.size = data.length;
    this.data = data;
  }
}
