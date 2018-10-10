import * as React from 'react';
import styled from 'styled-components';
import ReactDropzone, { ImageFile } from 'react-dropzone';

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

export class DragAndDrop extends React.Component<{}> {
  public static onDrop(acceptedFiles: Array<ImageFile>, rejectedFiles: Array<ImageFile>): void {
    return;
  }

  public render(): any {
    return (
      <DropzoneWrapper>
        <Dropzone onDrop={DragAndDrop.onDrop}>
          <Guidance>Locate, or drop files</Guidance>
        </Dropzone>
      </DropzoneWrapper>
    );
  }
}
