export default class {
  public readonly header = 'TAG';
  public title: string;
  public artist: string;
  public album: string;
  public year: number;
  public comment: string;
  public zeroByte: boolean;
  public track: number;
  public genre: number;

  constructor(
    title: string,
    artist: string,
    album: string,
    year: number,
    comment: string,
    zeroByte: boolean,
    track: number,
    genre: number
  ) {
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.year = year;
    this.comment = comment;
    this.zeroByte = zeroByte;
    this.track = track;
    this.genre = genre;
  }
}
