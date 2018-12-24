export default class {
  public readonly header = 'TAG';
  public title: string;
  public artist: string;
  public album: string;
  public year: number;
  public comment: string;
  public genre: number;

  constructor(
    title: string,
    artist: string,
    album: string,
    year: number,
    comment: string,
    genre: number
  ) {
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.year = year;
    this.comment = comment;
    this.genre = genre;
  }
}
