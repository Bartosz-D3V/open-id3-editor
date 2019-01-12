import Genre from './genre';

export default class {
  public readonly header = 'TAG';
  public title: string;
  public artist: string;
  public album: string;
  public year: number;
  public comment: string;
  public zeroByte: boolean;
  private _track: number;
  public genre: Genre;

  [key: string]: string | number | boolean | Genre;

  constructor(
    title?: string,
    artist?: string,
    album?: string,
    year?: number,
    comment?: string,
    zeroByte?: boolean,
    track?: number,
    genre?: Genre
  ) {
    this.title = title ? title : '';
    this.artist = artist ? artist : '';
    this.album = album ? album : '';
    this.year = year ? year : null;
    this.comment = comment ? comment : '';
    this.zeroByte = zeroByte ? zeroByte : false;
    this._track = track ? track : null;
    this.genre = genre ? genre : new Genre(-1, '');
  }

  set track(track: number) {
    track !== undefined ? (this.zeroByte = true) : (this.zeroByte = false);
    this._track = track;
  }

  get track(): number {
    return this._track !== undefined ? this._track : null;
  }
}
