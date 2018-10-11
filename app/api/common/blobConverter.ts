import FixedFileReaderEvent from './fixedFileReaderEvent';

export default class {
  public static blobToArrayBuffer = (blob: Blob): ArrayBuffer => {
    const fileReader: FileReader = new FileReader();
    let arrayBuffer: ArrayBuffer;
    let arrayUint8: Int8Array;
    fileReader.onload = (event: FixedFileReaderEvent) => {
      arrayBuffer = <ArrayBuffer>event.target.result;
      arrayUint8 = new Uint8Array(arrayBuffer);
    };
    fileReader.readAsArrayBuffer(blob);
    return <ArrayBuffer>fileReader.result;
  };
}
