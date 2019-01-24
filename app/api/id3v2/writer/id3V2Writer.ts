import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V22 from '../domain/2.2/id3V2';
import ID3V22Frame from '../domain/2.2/id3V2Frame';

export default class Id3V2Writer {
  private static readonly TAG = 'ID3';

  private static writeV22Frame(frame: ID3V22Frame): DataView {
    const frameId: DataView = new DataView(BufferUtil.createArrayBuffer(frame.frameID));
    const frameSize: DataView = Id3V2Writer.encodeFrameSize(frame.size);
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
    const size: DataView = Id3V2Writer.encodeFrameSize(header.size);

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

  public static encodeFrameSize(size: number): DataView {
    const buff: ArrayBuffer = new ArrayBuffer(4);
    const dataView: DataView = new DataView(buff);
    if (size < 1) return dataView;
    const encodedSize1: number = size >> 21;
    let reminder: number = size - (encodedSize1 << 21);
    const encodedSize2: number = reminder >> 14;
    reminder -= encodedSize2 << 14;
    const encodedSize3: number = reminder >> 7;
    reminder -= encodedSize3 << 7;
    dataView.setUint8(0, encodedSize1);
    dataView.setUint8(1, encodedSize2);
    dataView.setUint8(2, encodedSize3);
    dataView.setUint8(3, reminder);
    return dataView;
  }

  public static calcHeaderSize(frames: Array<ID3V22Frame>): number {
    return (
      frames
        .map(value => value.size + 3)
        .reduce((previousValue, currentValue) => previousValue + currentValue) + 10
    );
  }
}
