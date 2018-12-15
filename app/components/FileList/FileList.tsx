import * as React from 'react';
import { UploadFile } from 'antd/lib/upload/interface';
import { FileElement } from '@components/FileElement/FileElement';
import { IFileListProps } from './IFileListProps';

export class FileList extends React.Component<IFileListProps> {
  public render(): JSX.Element {
    const { files }: { files: Array<UploadFile> } = this.props;

    return (
      <div>
        {files.map((file: UploadFile, i: number) => (
          <FileElement key={file.uid} fileName={file.name} />
        ))}
      </div>
    );
  }
}
