import React, { Component } from 'react';
import styled from 'styled-components';
import { Icon, Modal, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { IUploadSingleImgState } from './IUploadSingleImgState';
import { IUploadSingleImgProps } from './IUploadSingleImgProps';
import { FrameID } from '@api/id3v2/domain/2.3/frameID';

const ImgWrapper = styled.img`
  width: 100%;
  height: 100%;
`;

export default class UploadSingleImg extends Component<
  IUploadSingleImgProps,
  IUploadSingleImgState
> {
  constructor(props: IUploadSingleImgProps) {
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
        <Modal visible={previewVisible}>
          <ImgWrapper alt={FrameID.APIC} src={previewImage} />
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
