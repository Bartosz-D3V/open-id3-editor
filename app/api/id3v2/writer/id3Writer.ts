import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V2FrameWrapper from '@api/id3v2/domain/id3V2FrameWrapper';
import ID3V20 from '../domain/id3V2';
import { FrameID } from '@api/id3v2/domain/frameID';

export default class Id3Writer {
  private static readonly TAG = 'ID3';

  public static convertID3V20ToDataView({ header, body }: ID3V20): DataView {
    const tag: DataView = new DataView(BufferUtil.createArrayBuffer(Id3Writer.TAG, 3));
    const version: DataView = new DataView(BufferUtil.createArrayBuffer(header.version, 2));
    const unsynchronisationFlag: DataView = new DataView(
      BufferUtil.createArrayBuffer(header.flags.unsynchronisation, 1)
    );
    const compressionFlag: DataView = new DataView(
      BufferUtil.createArrayBuffer(header.flags.compression, 1)
    );
    const size: DataView = new DataView(
      BufferUtil.createArrayBuffer(Id3Writer.encodeFrameSize(header.size))
    );
    const bodyView: Array<DataView> = [];
    for (let i = 0; i < body.length; i++) {
      bodyView.push(Id3Writer.writeFrame(body[i]));
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

  private static writeFrame(body: ID3V2FrameWrapper): DataView {
    const frameId: DataView = new DataView(BufferUtil.createArrayBuffer(body.frame.frameID));
    const frameSize: DataView = new DataView(
      BufferUtil.createArrayBuffer(Id3Writer.encodeFrameSize(body.frame.size))
    );
    const unsynchronisationFrameFlag: DataView = new DataView(
      BufferUtil.createArrayBuffer(body.frame.flags.unsynchronisation, 1)
    );
    const compressionFrameFlag: DataView = new DataView(
      BufferUtil.createArrayBuffer(body.frame.flags.compression, 1)
    );
    const data: DataView = new DataView(BufferUtil.createArrayBuffer(body.data));
    return BlobUtil.concatDataViews(
      frameId,
      frameSize,
      unsynchronisationFrameFlag,
      compressionFrameFlag,
      data
    );
  }

  public static encodeFrameSize(size: number): string {
    if (size < 1) return '0000';
    const encodedSize1: number = size >> 21;
    let reminder: number = size - (encodedSize1 << 21);
    const encodedSize2: number = reminder >> 14;
    reminder -= encodedSize2 << 14;
    const encodedSize3: number = reminder >> 7;
    reminder -= encodedSize3 << 7;
    return `${encodedSize1}${encodedSize2}${encodedSize3}${reminder}`;
  }
}
