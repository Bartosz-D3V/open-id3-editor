import ID3V20 from '../domain/id3V2';
import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';

export default class Id3Writer {
  private static readonly TAG = 'ID3';

  public static convertID3V20ToDataView({ header, body }: ID3V20): DataView {
    const tag: DataView = new DataView(BufferUtil.createArrayBuffer(Id3Writer.TAG, 3));
    const version: DataView = new DataView(BufferUtil.createArrayBuffer(header.version, 2));
    const flags: DataView = new DataView(BufferUtil.createArrayBuffer(header.flags, 2));
    const size: DataView = new DataView(BufferUtil.createArrayBuffer(header.size));

    const bodyView: Array<DataView> = [];
    for (let i = 0; i < body.length; i++) {
      const frameId: DataView = new DataView(BufferUtil.createArrayBuffer(body[i].frame.frameID));
      const frameSize: DataView = new DataView(BufferUtil.createArrayBuffer(body[i].frame.size));
      const frameFlags: DataView = new DataView(BufferUtil.createArrayBuffer(body[i].frame.flags));
      const data: DataView = new DataView(BufferUtil.createArrayBuffer(body[i].data));
      bodyView.push(BlobUtil.concatDataViews(frameId, frameSize, frameFlags, data));
    }
    return BlobUtil.concatDataViews(tag, version, flags, size, ...bodyView);
  }
}
