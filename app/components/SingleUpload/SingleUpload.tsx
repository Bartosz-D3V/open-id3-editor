import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Upload } from 'antd';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import UploadButton from '@components/UploadButton/UploadButton';
import { FrameID } from '@api/id3v2/domain/2.3/frameID';
import BlobUtil from '@api/common/blob/blobUtil';
import APICFrame from '@api/id3v2/domain/2.3/apicFrame';
import { ISingleUploadState } from './ISingleUploadState';
import { ISingleUploadProps } from './ISingleUploadProps';
import FsUtil from '@api/common/fs/fsUtil';

const ImgWrapper = styled.img`
  height: 100%;
  width: 100%;
`;

export default class SingleUpload extends Component<ISingleUploadProps, ISingleUploadState> {
  constructor(props: ISingleUploadProps) {
    super(props);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  }

  private static buildUploadFile(frame: APICFrame): UploadFile {
    return {
      uid: 'SINGLE_IMG',
      name: frame.description,
      status: 'done',
      size: 10,
      type: frame.rawData,
      url: BlobUtil.apicToBase64(frame),
    };
  }

  public componentWillReceiveProps(nextProps: Readonly<ISingleUploadProps>): void {
    const { apicFrame } = nextProps;
    const { fileList } = this.state;
    fileList[0] = SingleUpload.buildUploadFile(apicFrame);
    this.setState({ fileList });
  }

  public render(): JSX.Element {
    const { fileList, previewVisible, previewImage } = this.state;
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length === 0 ? <UploadButton /> : null}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <ImgWrapper alt={FrameID.APIC} src={previewImage} />
        </Modal>
      </div>
    );
  }

  private readonly handlePreview = (file: UploadFile): void => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  private readonly handleChange = (params: UploadChangeParam): void => {
    this.setState({ fileList: params.fileList });
    const { onImageChange } = this.props;
    if (!params.file) return;
    onImageChange(params.file.originFileObj);
  };

  private readonly handleCancel = () => this.setState({ previewVisible: false });
}
