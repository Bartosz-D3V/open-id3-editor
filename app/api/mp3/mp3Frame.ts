import MP3Header from './mp3Header';

export default class {
  public syncBits: DataView;
  public mp3Header: MP3Header;
  public mp3Data: DataView;
  public padding?: DataView;

  constructor(syncBits: DataView, mp3Header: MP3Header, mp3Data: DataView, padding?: DataView) {
    this.syncBits = syncBits;
    this.mp3Header = mp3Header;
    this.mp3Data = mp3Data;
    this.padding = padding;
  }
}
