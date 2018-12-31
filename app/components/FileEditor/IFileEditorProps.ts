import { UploadFile } from 'antd/lib/upload/interface';
import { selectFile } from '@actions/filesActions';

export interface IFileEditorProps {
  files: Array<UploadFile>;
  selectedFile: UploadFile;
  selectFile?: typeof selectFile;
}
