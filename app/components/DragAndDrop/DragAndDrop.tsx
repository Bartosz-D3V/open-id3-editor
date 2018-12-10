import * as React from 'react';
import { withRouter } from 'react-router';
import ReactDropzone from 'react-dropzone';
import styled from 'styled-components';
import { IDragAndDropProps } from './IDragAndDropProps';

const DropzoneWrapper = styled.div`
  height: 400px;
  width: 90%;
`;
const Dropzone = styled(ReactDropzone)`
  border: 2px dashed rgb(102, 102, 02);
  height: 100%;
  margin-left: 4%;
  margin-top: 10%;
  width: 100%;
`;
const Guidance = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5em;
  margin-top: 20%;
  text-align: center;
`;

class DragAndDrop extends React.Component<IDragAndDropProps> {
  constructor(props: IDragAndDropProps) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  public onDrop<T extends File>(acceptedFiles: Array<T>, rejectedFiles: Array<T>): any {
    this.props.addFiles(acceptedFiles);
    this.props.history.push('/file-list');
  }

  public render(): JSX.Element {
    return (
      <DropzoneWrapper>
        <Dropzone onDrop={this.onDrop}>
          <Guidance>Locate, or drop files</Guidance>
        </Dropzone>
      </DropzoneWrapper>
    );
  }
}
export default withRouter(DragAndDrop);
