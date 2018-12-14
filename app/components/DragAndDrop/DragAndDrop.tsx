import * as React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Upload, Icon, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import { IDragAndDropProps } from './IDragAndDropProps';

const Dragger = Upload.Dragger;
const DraggerWrapper = styled.div`
  height: 100vh;
`;

class DragAndDrop extends React.Component<IDragAndDropProps> {
  constructor(props: IDragAndDropProps) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  public onDrop(info: UploadChangeParam): void {
    const status = info.file.status;
    const acceptedFiles: Array<UploadFile> = info.fileList;
    if (status === 'done') {
      this.props.addFiles(acceptedFiles);
      this.props.history.push('/file-list');
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  public render(): JSX.Element {
    return (
      <DraggerWrapper>
        <Dragger multiple={true} showUploadList={false} onChange={this.onDrop}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
        </Dragger>
      </DraggerWrapper>
    );
  }
}
export default withRouter(DragAndDrop);
