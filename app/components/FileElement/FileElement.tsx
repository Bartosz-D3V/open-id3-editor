import * as React from 'react';
import { IFileElementProps } from './IFileElementProps';

export class FileElement extends React.Component<IFileElementProps> {
  public render(): JSX.Element {
    const { fileName }: { fileName: string } = this.props;

    return <span>{fileName}</span>;
  }
}
