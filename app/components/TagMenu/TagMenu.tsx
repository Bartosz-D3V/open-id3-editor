import { Menu } from 'antd';
import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuWrapper = styled(Menu)`
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
`;

const supportedTags: Array<string> = ['ID3v1.0', 'ID3v1.1', 'ID3v2.0', 'ID3v2.2', 'ID3v2.3'];

export const TagMenu = () => (
  <MenuWrapper mode="horizontal">
    {supportedTags.map((tag: string) => {
      return (
        <Menu.Item key={tag}>
          <Link to={`/file-list/edit/${tag}`} replace={true}>
            {tag}
          </Link>
        </Menu.Item>
      );
    })}
  </MenuWrapper>
);
