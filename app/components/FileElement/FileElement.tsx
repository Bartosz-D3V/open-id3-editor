import * as React from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { IFileElementProps } from './IFileElementProps';

const MenuItem = styled(Menu.Item)`
  &.ant-menu-item {
    margin: 0;
    padding: 0;
  }
`;

export class FileElement extends React.Component<IFileElementProps> {
  public render(): JSX.Element {
    const { filename }: { filename: string } = this.props;

    return (
      <MenuItem {...this.props}>
        <span>{filename}</span>
      </MenuItem>
    );
  }
}
