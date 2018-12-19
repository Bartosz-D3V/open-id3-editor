import * as React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { IFileElementProps } from './IFileElementProps';

const MenuItem = styled(Menu.Item)`
  padding: 0;
  margin: 0;
`;

export class FileElement extends React.Component<IFileElementProps> {
  public render(): JSX.Element {
    const { key, filename }: { key: string; filename: string } = this.props;

    return (
      <MenuItem key={key} {...this.props}>
        <span>{filename}</span>
      </MenuItem>
    );
  }
}
