import Genre from '@api/id3/domain/genre';

export default class {
  public readonly header = 'TAG';
  public title: string;
  public artist: string;
  public album: string;
  public year: number;
  public comment: string;
  public genre: Genre;
  [key: string]: string | number | Genre;

  constructor(
    title?: string,
    artist?: string,
    album?: string,
    year?: number,
    comment?: string,
    genre?: Genre
  ) {
    this.title = title ? title : '';
    this.artist = artist ? artist : '';
    this.album = album ? album : '';
    this.year = year ? year : null;
    this.comment = comment ? comment : '';
    this.genre = genre ? genre : new Genre(-1, '');
  }
}
