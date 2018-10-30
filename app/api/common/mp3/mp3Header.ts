export default class {
  public mp3SyncWord: string;
  public version: number;
  public layer: number;
  public errorProtection: boolean;
  public bitrateIndex: number;
  public samplingRateFrequency: string;
  public paddingBit: boolean;
  public privateBit: boolean;
  public channelMode: string;
  public copy: boolean;
  public original: boolean;
  public emphasis: number;

  constructor(
    mp3SyncWord: string,
    version: number,
    layer: number,
    errorProtection: boolean,
    bitrateIndex: number,
    samplingRateFrequency: string,
    paddingBit: boolean,
    privateBit: boolean,
    channelMode: string,
    copy: boolean,
    original: boolean,
    emphasis: number
  ) {
    this.mp3SyncWord = mp3SyncWord;
    this.version = version;
    this.layer = layer;
    this.errorProtection = errorProtection;
    this.bitrateIndex = bitrateIndex;
    this.samplingRateFrequency = samplingRateFrequency;
    this.paddingBit = paddingBit;
    this.privateBit = privateBit;
    this.channelMode = channelMode;
    this.copy = copy;
    this.original = original;
    this.emphasis = emphasis;
  }
}
