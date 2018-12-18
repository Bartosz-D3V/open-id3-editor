import * as React from 'react';
import { Menu } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import styled from 'styled-components';
import { FileElement } from '@components/FileElement/FileElement';
import { IFileListProps } from './IFileListProps';

const FileListWrapper = styled.div`
  padding: 0;
  margin: 0;
  width: 180px;
`;

export class FileList extends React.Component<IFileListProps> {
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
            <FileElement key={file.uid} fileName={file.name} {...this.props} />
          ))}
        </Menu>
      </FileListWrapper>
    );
  }
}
