import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V22FrameWrapper from '@api/id3v2/domain/2.2/id3V2FrameWrapper';
import ID3V23FrameWrapper from '@api/id3v2/domain/2.3/id3V2FrameWrapper';
import ID3V22 from '../domain/2.2/id3V2';
import ID3V23 from '../domain/2.3/id3V2';

export default class Id3Writer {
  private static readonly TAG = 'ID3';

  public static convertID3V22ToDataView({ header, body }: ID3V22): DataView {
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
      bodyView.push(Id3Writer.writeV22Frame(body[i]));
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

  private static writeV22Frame(body: ID3V22FrameWrapper): DataView {
    const frameId: DataView = new DataView(BufferUtil.createArrayBuffer(body.frame.frameID));
    const frameSize: DataView = new DataView(
      BufferUtil.createArrayBuffer(Id3Writer.encodeFrameSize(body.frame.size))
    );
    const data: DataView = new DataView(BufferUtil.createArrayBuffer(body.data));
    return BlobUtil.concatDataViews(frameId, frameSize, data);
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
