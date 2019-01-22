export default class ID3V2FrameFlags {
  public tagAlter: boolean;
  public fileALter: boolean;
  public readonly: boolean;
  public compression: boolean;
  public encryption: boolean;
  public groupingEntity: boolean;

  constructor(
    tagAlter: boolean = false,
    fileALter: boolean = false,
    readonly: boolean = false,
    compression: boolean = false,
    encryption: boolean = false,
    groupingEntity: boolean = false
  ) {
    this.tagAlter = tagAlter;
    this.fileALter = fileALter;
    this.readonly = readonly;
    this.compression = compression;
    this.encryption = encryption;
    this.groupingEntity = groupingEntity;
  }
}
