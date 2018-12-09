import * as React from 'react';
import { ImageFile } from 'react-dropzone';
import { FileElement } from '@components/FileElement/FileElement';
import { IFileListProps } from './IFileListProps';

export class FileList extends React.Component<IFileListProps> {
  public render(): JSX.Element {
    const { files }: { files: Array<ImageFile> } = this.props;

    return (
      <div>
        {files.map((file: ImageFile, i: number) => (
          <FileElement key={i} fileName={file.name} />
        ))}
      </div>
    );
  }
}
