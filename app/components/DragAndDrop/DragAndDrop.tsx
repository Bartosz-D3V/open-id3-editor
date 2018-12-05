import * as React from 'react';
import styled from 'styled-components';
import ReactDropzone, { ImageFile } from 'react-dropzone';
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

export class DragAndDrop extends React.Component<IDragAndDropProps> {
  private readonly actions;

  constructor(props: IDragAndDropProps) {
    super(props);
    this.actions = props.actions;
    this.onDrop = this.onDrop.bind(this);
  }

  public onDrop(acceptedFiles: Array<ImageFile>, rejectedFiles: Array<ImageFile>): void {
    this.actions.addFiles(acceptedFiles);
  }

  public render(): any {
    return (
      <DropzoneWrapper>
        <Dropzone onDrop={this.onDrop}>
          <Guidance>Locate, or drop files</Guidance>
        </Dropzone>
      </DropzoneWrapper>
    );
  }
}
