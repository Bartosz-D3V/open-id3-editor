import { RouteComponentProps } from 'react-router';
import { UploadFile } from 'antd/lib/upload/interface';

export interface IDragAndDropProps extends RouteComponentProps {
  addFiles: (files: Array<UploadFile>) => void;
}
