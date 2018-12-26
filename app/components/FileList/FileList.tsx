import React, { Component } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { UploadFile } from 'antd/lib/upload/interface';
import { IFileListProps } from './IFileListProps';
import FileElement from '@containers/FileElement';

const FileListWrapper = styled.div`
  background-color: white;
  margin: 0;
  padding: 0;
  width: 200px;
`;

export class FileList extends Component<IFileListProps> {
  public render(): JSX.Element {
    const { files }: { files: Array<UploadFile> } = this.props;

    return (
      <FileListWrapper>
        <Menu
          defaultSelectedKeys={[files[0].uid]}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
        >
          {files.map((file: UploadFile) => (
            <FileElement key={file.uid} filename={file.name} uid={file.uid} />
          ))}
        </Menu>
      </FileListWrapper>
    );
  }
}
