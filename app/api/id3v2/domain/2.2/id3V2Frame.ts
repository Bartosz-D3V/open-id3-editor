import { FrameID } from './frameID';

export default class {
  public frameID: FrameID | string;
  public size: number;
  public data: any;

  constructor(frameID: FrameID | string, data: any) {
    this.frameID = frameID;
    this.size = data.length;
    this.data = data;
  }
}
