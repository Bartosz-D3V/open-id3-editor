import BufferUtil from '@api/common/buffer/bufferUtil';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V2 from '../domain/2.3/id3v2';
import ID3V2Frame from '../domain/2.3/id3v2Frame';
import ID3V2HeaderFlags from '../domain/2.3/id3v2HeaderFlags';
import ID3V2FrameFlags from '../domain/2.3/id3v2FrameFlags';
import ID3V2Header from '../domain/2.3/id3v2Header';
import ID3V2ExtendedHeader from '../domain/2.3/id3v2ExtendedHeader';
import ID3V2ExtendedHeaderFlags from '../domain/2.3/id3v2ExtendedHeaderFlags';
import APICFrame from '../domain/2.3/apicFrame';

export default class ID3V2Reader {
  public static readID3V23(dataView: DataView): ID3V2 {
    const header: ID3V2Header = ID3V2Reader.readHeader(dataView);
    const {
      size,
      flags: { extendedHeader },
    } = header;

    let additionalHeader: ID3V2ExtendedHeader;
    if (extendedHeader) {
      additionalHeader = ID3V2Reader.readExtendedHeader(dataView, 10);
    }

    const data: Array<ID3V2Frame> = [];
    let i: number = extendedHeader ? additionalHeader.size + 10 : 10;
    while (i < size && dataView.getInt8(i) > 0x00) {
      const frame: ID3V2Frame = ID3V2Reader.readFrame(dataView, i);
      data.push(frame);
      i += frame.size + 10;
    }
    return new ID3V2(header, data, additionalHeader);
  }

  private static readHeader(dataView: DataView): ID3V2Header {
    const version: string = BlobUtil.dataViewToString(dataView, 3, 2);
    const unsynchronization: boolean = BufferUtil.isBitSetAt(dataView, 5, 8);
    const extenderHeader: boolean = BufferUtil.isBitSetAt(dataView, 5, 7);
    const experimental: boolean = BufferUtil.isBitSetAt(dataView, 5, 6);
    const size: number = ID3V2Reader.readFrameSize(dataView, 6, false);
    return new ID3V2Header(
      version,
      new ID3V2HeaderFlags(unsynchronization, extenderHeader, experimental),
      size
    );
  }

  private static readExtendedHeader(dataView: DataView, offset: number): ID3V2ExtendedHeader {
    const size: number = ID3V2Reader.readFrameSize(dataView, offset);
    const crcData: boolean = BufferUtil.isBitSetAt(dataView, offset + 4, 8);
    const padding: number = ID3V2Reader.readFrameSize(dataView, offset + 6);
    return new ID3V2ExtendedHeader(size, new ID3V2ExtendedHeaderFlags(crcData), padding);
  }

  private static readFrame(dataView: DataView, offset: number): ID3V2Frame {
    const frameId: string = BlobUtil.dataViewToString(dataView, offset, 4);
    const frameSize: number = ID3V2Reader.readFrameSize(dataView, offset + 4);
    const tagAlter: boolean = BufferUtil.isBitSetAt(dataView, 9, 8);
    const fileAlter: boolean = BufferUtil.isBitSetAt(dataView, 9, 7);
    const readonly: boolean = BufferUtil.isBitSetAt(dataView, 9, 6);
    const compression: boolean = BufferUtil.isBitSetAt(dataView, 10, 8);
    const encryption: boolean = BufferUtil.isBitSetAt(dataView, 10, 7);
    const groupingEntity: boolean = BufferUtil.isBitSetAt(dataView, 10, 6);
    const frameFlags: ID3V2FrameFlags = new ID3V2FrameFlags(
      tagAlter,
      fileAlter,
      readonly,
      compression,
      encryption,
      groupingEntity
    );
    const frameData =
      frameId === 'APIC'
        ? ID3V2Reader.dataViewToAPIC(dataView, offset + 10, frameSize)
        : BlobUtil.dataViewToString(dataView, offset + 10, frameSize);
    return new ID3V2Frame(frameId, frameFlags, frameData, frameSize);
  }

  public static readFrameSize(dataView: DataView, offset: number = 0, big: boolean = true): number {
    const size1: number = BlobUtil.dataViewToNum(dataView, offset);
    const size2: number = BlobUtil.dataViewToNum(dataView, offset + 1);
    const size3: number = BlobUtil.dataViewToNum(dataView, offset + 2);
    const size4: number = BlobUtil.dataViewToNum(dataView, offset + 3);
    const i: number = big ? 8 : 7;
    return (size1 << (i * 3)) | (size2 << (i * 2)) | (size3 << i) | size4;
  }

  private static dataViewToAPIC(dataView: DataView, offset: number, frameSize: number): APICFrame {
    const encoding: number = BlobUtil.dataViewToNum(dataView, offset);
    let internalOffset = 1;
    const mimeType: string = BlobUtil.getTextTerminatedByCharCode(dataView, offset + 1, 0);
    internalOffset += mimeType.length + 1;
    const pictureType: number = BlobUtil.dataViewToNum(dataView, offset + internalOffset);
    internalOffset += 1;
    const description: string = BlobUtil.getTextTerminatedByCharCode(
      dataView,
      offset + internalOffset,
      0
    );
    internalOffset += description.length + 1;
    const imageData: string = BlobUtil.dataViewToRawString(
      dataView,
      offset + internalOffset,
      frameSize - internalOffset
    );
    return new APICFrame(encoding, mimeType, pictureType, description, imageData);
  }
}
