import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V23 from '../domain/2.3/id3v2';
import ID3V23Frame from '../domain/2.3/id3v2Frame';
import ID3V23HeaderFlags from '../domain/2.3/id3v2HeaderFlags';
import ID3V23FrameFlags from '../domain/2.3/id3v2FrameFlags';
import APICFrame from '@api/id3v2/domain/2.3/apicFrame';

export default class Id3v2Writer {
  private static readonly TAG = 'ID3';

  public static convertID3V23ToDataView({ header, body }: ID3V23): DataView {
    const tag: DataView = new DataView(BufferUtil.createArrayBuffer(Id3v2Writer.TAG, 3));
    const version: DataView = new DataView(BufferUtil.createArrayBuffer(header.version, 2));
    const flags: DataView = Id3v2Writer.writeV23HeaderFlags(header.flags);
    const size: DataView = Id3v2Writer.encodeFrameSize(header.size, false);

    const bodyView: Array<DataView> = [];
    for (let i = 0; i < body.length; i++) {
      if (!body[i].data) continue;
      bodyView.push(Id3v2Writer.writeV23Frame(body[i]));
    }
    return BlobUtil.concatDataViews(tag, version, flags, size, ...bodyView);
  }

  private static writeV23HeaderFlags(flags: ID3V23HeaderFlags): DataView {
    let dataView: DataView = new DataView(new ArrayBuffer(1));
    if (flags.unsynchronisation) {
      dataView = BufferUtil.setBitAt(dataView, 0, 2);
    }
    if (flags.extendedHeader) {
      dataView = BufferUtil.setBitAt(dataView, 0, 1);
    }
    if (flags.experimental) {
      dataView = BufferUtil.setBitAt(dataView, 0, 0);
    }
    return dataView;
  }

  private static writeV23Frame(frame: ID3V23Frame): DataView {
    const frameId: DataView = new DataView(BufferUtil.createArrayBuffer(frame.frameID));
    const isAPIC: boolean = frame.frameID === 'APIC';
    const frameLength: number = Id3v2Writer.getFrameLength(frame);
    const frameSize: DataView = Id3v2Writer.encodeFrameSize(frameLength + (!isAPIC ? 1 : 0));
    const frameFlags: DataView = Id3v2Writer.writeV23FrameFlags(frame.flags);
    const data: DataView = isAPIC
      ? Id3v2Writer.writeV23APICFrame(frame.data)
      : new DataView(BufferUtil.createArrayBuffer(frame.data));
    const encoding: DataView = new DataView(BufferUtil.createArrayBuffer(0));
    return BlobUtil.concatDataViews(
      frameId,
      frameSize,
      frameFlags,
      isAPIC ? data : BlobUtil.concatDataViews(encoding, data)
    );
  }

  private static getFrameLength(frame: ID3V23Frame): number {
    if (frame.frameID === 'APIC') {
      const apicFrame: APICFrame = frame.data;
      return apicFrame.mimeType.length + apicFrame.rawData.length + 4;
    }
    return frame.data.length;
  }

  private static writeV23APICFrame(frame: APICFrame): DataView {
    const encoding: DataView = new DataView(BufferUtil.createArrayBuffer(frame.textEncoding));
    const mimeType: DataView = new DataView(
      BufferUtil.createArrayBuffer(frame.mimeType, frame.mimeType.length + 1)
    );
    const pictureType: DataView = new DataView(BufferUtil.createArrayBuffer(frame.pictureType));
    const description: DataView = new DataView(
      BufferUtil.createArrayBuffer(frame.description, frame.description.length + 1)
    );
    const imageData: DataView = new DataView(BufferUtil.createArrayBuffer(frame.rawData));
    return BlobUtil.concatDataViews(encoding, mimeType, pictureType, description, imageData);
  }

  private static writeV23FrameFlags(flags: ID3V23FrameFlags): DataView {
    let dataView: DataView = new DataView(new ArrayBuffer(2));
    if (flags.tagAlter) {
      dataView = BufferUtil.setBitAt(dataView, 0, 2);
    }
    if (flags.fileAlter) {
      dataView = BufferUtil.setBitAt(dataView, 0, 1);
    }
    if (flags.readonly) {
      dataView = BufferUtil.setBitAt(dataView, 0, 0);
    }
    if (flags.compression) {
      dataView = BufferUtil.setBitAt(dataView, 1, 2);
    }
    if (flags.encryption) {
      dataView = BufferUtil.setBitAt(dataView, 1, 1);
    }
    if (flags.groupingEntity) {
      dataView = BufferUtil.setBitAt(dataView, 1, 0);
    }
    return dataView;
  }

  public static encodeFrameSize(size: number, big: boolean = true): DataView {
    const i: number = big ? 8 : 7;
    const dataView: DataView = new DataView(new ArrayBuffer(4));
    const encodedSize1: number = size >> (i * 3);
    let reminder: number = size - (encodedSize1 << (i * 3));
    const encodedSize2: number = reminder >> (i * 2);
    reminder -= encodedSize2 << (i * 2);
    const encodedSize3: number = reminder >> i;
    reminder -= encodedSize3 << i;
    dataView.setUint8(0, encodedSize1);
    dataView.setUint8(1, encodedSize2);
    dataView.setUint8(2, encodedSize3);
    dataView.setUint8(3, reminder);
    return dataView;
  }

  public static calcV2HeaderSize = (frames: Array<ID3V23Frame>, frameSize: number): number =>
    frames
      .map(value => value.size + frameSize + 4)
      .reduce((previousValue, currentValue) => previousValue + currentValue) + 10;
}
