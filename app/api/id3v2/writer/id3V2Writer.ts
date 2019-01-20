import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V22 from '../domain/2.2/id3V2';
import ID3V22Frame from '../domain/2.2/id3V2Frame';

export default class Id3V2Writer {
  private static readonly TAG = 'ID3';

  private static writeV22Frame(frame: ID3V22Frame): DataView {
    const frameId: DataView = new DataView(BufferUtil.createArrayBuffer(frame.frameID));
    const frameSize: DataView = new DataView(
      BufferUtil.createArrayBuffer(Id3V2Writer.encodeFrameSize(frame.size), 4)
    );
    const data: DataView = new DataView(BufferUtil.createArrayBuffer(frame.data));
    return BlobUtil.concatDataViews(frameId, frameSize, data);
  }

  public static convertID3V22ToDataView({ header, body }: ID3V22): DataView {
    const tag: DataView = new DataView(BufferUtil.createArrayBuffer(Id3V2Writer.TAG, 3));
    const version: DataView = new DataView(BufferUtil.createArrayBuffer(header.version, 2));
    const unsynchronisationFlag: DataView = new DataView(
      BufferUtil.createArrayBuffer(header.flags.unsynchronisation, 1)
    );
    const compressionFlag: DataView = new DataView(
      BufferUtil.createArrayBuffer(header.flags.compression, 1)
    );
    const size: DataView = new DataView(
      BufferUtil.createArrayBuffer(Id3V2Writer.encodeFrameSize(header.size), 4)
    );

    const bodyView: Array<DataView> = [];
    for (let i = 0; i < body.length; i++) {
      bodyView.push(Id3V2Writer.writeV22Frame(body[i]));
    }
    return BlobUtil.concatDataViews(
      tag,
      version,
      unsynchronisationFlag,
      compressionFlag,
      size,
      ...bodyView
    );
  }

  public static encodeFrameSize(size: number): number {
    if (size < 1) return 0;
    const encodedSize1: number = size >> 21;
    let reminder: number = size - (encodedSize1 << 21);
    const encodedSize2: number = reminder >> 14;
    reminder -= encodedSize2 << 14;
    const encodedSize3: number = reminder >> 7;
    reminder -= encodedSize3 << 7;
    return Number.parseInt(`${encodedSize1}${encodedSize2}${encodedSize3}${reminder}`, 10);
  }

  public static calcHeaderSize(frames: Array<ID3V22Frame>): number {
    return (
      frames
        .map(value => value.size + 3)
        .reduce((previousValue, currentValue) => previousValue + currentValue) + 10
    );
  }
}
