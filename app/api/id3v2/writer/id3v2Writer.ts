import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import Genre from '@api/id3/domain/genre';
import ID3V22 from '../domain/2.2/id3v2';
import ID3V22Frame from '../domain/2.2/id3v2Frame';
import ID3V22HeaderFlags from '../domain/2.2/id3v2HeaderFlags';
import ID3V23 from '../domain/2.3/id3v2';
import ID3V23Frame from '../domain/2.3/id3v2Frame';
import ID3V23HeaderFlags from '../domain/2.3/id3v2HeaderFlags';
import ID3V23FrameFlags from '../domain/2.3/id3v2FrameFlags';

export default class Id3v2Writer {
  private static readonly TAG = 'ID3';

  public static convertID3V22ToDataView({ header, body }: ID3V22): DataView {
    const tag: DataView = new DataView(BufferUtil.createArrayBuffer(Id3v2Writer.TAG, 3));
    const version: DataView = new DataView(BufferUtil.createArrayBuffer(header.version, 2));
    const flags: DataView = Id3v2Writer.writeV22HeaderFlags(header.flags);
    const size: DataView = Id3v2Writer.encodeFrameSize(header.size);

    const bodyView: Array<DataView> = [];
    for (let i = 0; i < body.length; i++) {
      bodyView.push(Id3v2Writer.writeV22Frame(body[i]));
    }
    return BlobUtil.concatDataViews(tag, version, flags, size, ...bodyView);
  }

  private static writeV22HeaderFlags(flags: ID3V22HeaderFlags): DataView {
    let dataView: DataView = new DataView(new ArrayBuffer(1));
    if (flags.compression) {
      dataView = BufferUtil.setBitAt(dataView, 0, 8);
    }
    if (flags.unsynchronisation) {
      dataView = BufferUtil.setBitAt(dataView, 0, 7);
    }
    return dataView;
  }

  private static writeV22Frame(frame: ID3V22Frame): DataView {
    const frameId: DataView = new DataView(BufferUtil.createArrayBuffer(frame.frameID));
    const frameSize: DataView = Id3v2Writer.encodeFrameSize(frame.size);
    const data: DataView = new DataView(BufferUtil.createArrayBuffer(frame.data));
    return BlobUtil.concatDataViews(frameId, frameSize, data);
  }

  public static convertID3V23ToDataView({ header, body }: ID3V23): DataView {
    const tag: DataView = new DataView(BufferUtil.createArrayBuffer(Id3v2Writer.TAG, 3));
    const version: DataView = new DataView(BufferUtil.createArrayBuffer(header.version, 2));
    const flags: DataView = Id3v2Writer.writeV23HeaderFlags(header.flags);
    const size: DataView = Id3v2Writer.encodeFrameSize(header.size);

    const bodyView: Array<DataView> = [];
    for (let i = 0; i < body.length; i++) {
      bodyView.push(Id3v2Writer.writeV23Frame(body[i]));
    }
    return BlobUtil.concatDataViews(tag, version, flags, size, ...bodyView);
  }

  private static writeV23HeaderFlags(flags: ID3V23HeaderFlags): DataView {
    let dataView: DataView = new DataView(new ArrayBuffer(1));
    if (flags.unsynchronisation) {
      dataView = BufferUtil.setBitAt(dataView, 0, 8);
    }
    if (flags.extendedHeader) {
      dataView = BufferUtil.setBitAt(dataView, 0, 7);
    }
    if (flags.experimental) {
      dataView = BufferUtil.setBitAt(dataView, 0, 6);
    }
    return dataView;
  }

  private static writeV23Frame(frame: ID3V23Frame): DataView {
    const frameId: DataView = new DataView(BufferUtil.createArrayBuffer(frame.frameID));
    const frameSize: DataView = Id3v2Writer.encodeFrameSize(frame.size);
    const frameFlags: DataView = Id3v2Writer.writeV23FrameFlags(frame.flags);
    const data: DataView = new DataView(BufferUtil.createArrayBuffer(frame.data));
    return BlobUtil.concatDataViews(frameId, frameSize, frameFlags, data);
  }

  private static writeV23FrameFlags(flags: ID3V23FrameFlags): DataView {
    let dataView: DataView = new DataView(new ArrayBuffer(2));
    if (flags.tagAlter) {
      dataView = BufferUtil.setBitAt(dataView, 0, 8);
    }
    if (flags.fileALter) {
      dataView = BufferUtil.setBitAt(dataView, 0, 7);
    }
    if (flags.readonly) {
      dataView = BufferUtil.setBitAt(dataView, 0, 6);
    }
    if (flags.compression) {
      dataView = BufferUtil.setBitAt(dataView, 1, 8);
    }
    if (flags.encryption) {
      dataView = BufferUtil.setBitAt(dataView, 1, 7);
    }
    if (flags.groupingEntity) {
      dataView = BufferUtil.setBitAt(dataView, 1, 6);
    }
    return dataView;
  }

  public static encodeFrameSize(size: number): DataView {
    const dataView: DataView = new DataView(new ArrayBuffer(4));
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

  public static calcV2HeaderSize = (frames: Array<ID3V22Frame>, frameSize: number): number =>
    frames
      .map(value => value.size + frameSize + 3)
      .reduce((previousValue, currentValue) => previousValue + currentValue) + 10;

  public static writeGenres(genres: Array<Genre>): string {
    let contentType = '';
    genres.forEach((genre: Genre) => {
      contentType += `(${genre.index})`;
    });
    return contentType;
  }
}
