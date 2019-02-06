import React, { Component } from 'react';
import { Icon, Modal, Upload } from 'antd';
import { IUploadSingleImgState } from './IUploadSingleImgState';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';

export default class UploadSingleImg extends Component<{}, IUploadSingleImgState> {
  constructor(props: {}) {
    super(props);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  public render(): JSX.Element {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length === 0 ? uploadButton : null}
        </Upload>
        <Modal visible={previewVisible} footer={null}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }

  public handlePreview = (file: UploadFile): void => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  public handleChange = (params: UploadChangeParam): void =>
    this.setState({ fileList: params.fileList });
}
