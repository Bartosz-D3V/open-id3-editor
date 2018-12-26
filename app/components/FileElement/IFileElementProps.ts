import { selectFile } from '@actions/filesActions';

export interface IFileElementProps {
  filename: string;
  uid: string;
  selectFile?: typeof selectFile;
}
