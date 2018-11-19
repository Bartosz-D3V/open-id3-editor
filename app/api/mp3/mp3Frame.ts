import MP3Header from './mp3Header';

export default class {
  public mp3Header: MP3Header;
  public mp3Data: DataView;

  constructor(mp3Header: MP3Header, mp3Data: DataView) {
    this.mp3Header = mp3Header;
    this.mp3Data = mp3Data;
  }
}
