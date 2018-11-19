import MP3 from './mp3';
import Mp3Util from './util/mp3Util';
import MP3Frame from './mp3Frame';

export default class Mp3Reader {
  public static readMP3(mp3: DataView): MP3 {
    const rawMP3: DataView = Mp3Util.getMP3WithoutTags(mp3);
    const frames: Array<MP3Frame> = [];

    let i = 0;
    while (rawMP3.getInt8(i) !== 0x00) {}
  }
}
