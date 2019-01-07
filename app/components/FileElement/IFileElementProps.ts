import { selectFile } from '@actions/files/filesActions';

export interface IFileElementProps {
  filename: string;
  uid: string;
  selectFile?: typeof selectFile;
}
