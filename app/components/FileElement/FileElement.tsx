import React, { Component } from 'react';
import { Menu } from 'antd';
import styled from 'styled-components';
import { ClickParam } from 'antd/lib/menu';
import { IFileElementProps } from './IFileElementProps';

const MenuItem = styled(Menu.Item)`
  &.ant-menu-item {
    margin: 0;
    padding: 0;
  }
`;

export class FileElement extends Component<IFileElementProps> {
  constructor(props: IFileElementProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  public onClick(clickParam: ClickParam): string {
    const { selectFile } = this.props;
    const uid: string = clickParam.item.props.uid;
    return selectFile(uid).payload;
  }

  public render(): JSX.Element {
    const { filename, selectFile, ...props } = this.props;

    return (
      <MenuItem {...props} onClick={this.onClick}>
        <span>{filename}</span>
      </MenuItem>
    );
  }
}
