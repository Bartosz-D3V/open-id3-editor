import { UploadFile } from 'antd/lib/upload/interface';

export interface IUploadSingleImgState {
  previewVisible: boolean;
  previewImage: string;
  fileList: Array<UploadFile>;
}
