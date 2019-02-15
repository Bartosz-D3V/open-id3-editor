import React, { Component } from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Upload, Icon, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile, RcFile } from 'antd/lib/upload/interface';
import { IDragAndDropProps } from './IDragAndDropProps';

const Dragger = Upload.Dragger;
const DraggerWrapper = styled.div`
  height: 100vh;
`;

class DragAndDrop extends Component<IDragAndDropProps> {
  constructor(props: IDragAndDropProps) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.validateFormat = this.validateFormat.bind(this);
  }

  private static onlyMP3s = (files: Array<File>): boolean =>
    files.filter(v => v.type === 'audio/mp3').length === files.length;

  public render(): JSX.Element {
    return (
      <DraggerWrapper>
        <Dragger
          multiple
          showUploadList={false}
          onChange={this.onDrop}
          beforeUpload={this.validateFormat}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
      </DraggerWrapper>
    );
  }

  public validateFormat(file: RcFile, files: Array<RcFile>): any {
    const onlyMP3s = DragAndDrop.onlyMP3s(files);
    if (!onlyMP3s) {
      message.error('Please provide MP3 file(s).');
      files.length = 0;
    }
    return onlyMP3s;
  }

  public onDrop(info: UploadChangeParam): void {
    const status = info.file.status;
    const acceptedFiles: Array<UploadFile> = info.fileList;
    if (status === 'done') {
      this.props.setFiles(acceptedFiles);
      this.props.history.push('/file-list');
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
}
export default withRouter(DragAndDrop);
