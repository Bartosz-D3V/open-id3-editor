import { UploadFile } from 'antd/lib/upload/interface';

export interface ISingleUploadState {
  previewVisible: boolean;
  previewImage: string;
  fileList: Array<UploadFile>;
}
