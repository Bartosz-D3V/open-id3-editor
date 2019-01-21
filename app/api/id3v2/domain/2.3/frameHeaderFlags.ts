export default class FrameHeaderFlags {
  public tagAlterPrevention: boolean;
  public fileAlterPrevention: boolean;
  public readOnly: boolean;
  public compression: boolean;
  public encryption: boolean;
  public groupingIdentity: boolean;

  constructor(
    tagAlterPrevention: boolean = false,
    fileAlterPrevention: boolean = false,
    readOnly: boolean = false,
    compression: boolean = false,
    encryption: boolean = false,
    groupingIdentity: boolean = false
  ) {
    this.tagAlterPrevention = tagAlterPrevention;
    this.fileAlterPrevention = fileAlterPrevention;
    this.readOnly = readOnly;
    this.compression = compression;
    this.encryption = encryption;
    this.groupingIdentity = groupingIdentity;
  }
}
