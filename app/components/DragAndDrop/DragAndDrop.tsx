import * as React from 'react';
import styled from 'styled-components';
import ReactDropzone from 'react-dropzone';

declare type ImageFile = ReactDropzone.ImageFile;

const DropzoneWrapper = styled.div`
  width: 90%;
  height: 400px;
`;
const Dropzone = styled(ReactDropzone)`
  width: 100%;
  height: 100%;
  margin-top: 10%;
  margin-left: 4%;
  border: 2px dashed rgb(102, 102, 02);
`;

export class DragAndDrop extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  public render(): any {
    return (
      <DropzoneWrapper>
        <Dropzone onDrop={this.onDrop} />
      </DropzoneWrapper>
    );
  }

  public onDrop(acceptedFiles: Array<ImageFile>, rejectedFiles: Array<ImageFile>): any {
    console.log(acceptedFiles);
  }
}
