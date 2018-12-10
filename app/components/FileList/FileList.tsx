import * as React from 'react';
import { FileElement } from '@components/FileElement/FileElement';
import { IFileListProps } from './IFileListProps';

export class FileList extends React.Component<IFileListProps<File>> {
  public render(): JSX.Element {
    const { files }: { files: Array<File> } = this.props;

    return (
      <div>
        {files.map((file: File, i: number) => (
          <FileElement key={i} fileName={file.name} />
        ))}
      </div>
    );
  }
}
