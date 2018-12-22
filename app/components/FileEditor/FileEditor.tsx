import * as React from 'react';
import { Route } from 'react-router';
import { Layout } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { BasicProps } from 'antd/lib/layout/layout';
import styled from 'styled-components';
import { FileList } from '@components/FileList/FileList';
import { TagMenu } from '@components/TagMenu/TagMenu';
import { IFileEditorProps } from './IFileEditorProps';
import { TagFormV10 } from '@components/TagForm/TagFormV10';

const {
  Header,
  Sider,
  Content,
}: {
  Header: React.ComponentClass<BasicProps>;
  Sider: React.ComponentClass<BasicProps>;
  Content: React.ComponentClass<BasicProps>;
} = Layout;

const HeaderWrapper = styled(Header)`
  background-color: white;
  padding: 2px;
  width: 100%;
`;

export class FileEditor extends React.Component<IFileEditorProps> {
  public render(): JSX.Element {
    const { files }: { files: Array<UploadFile> } = this.props;

    return (
      <Layout>
        <Sider>
          <FileList files={files} />
        </Sider>
        <Layout>
          <HeaderWrapper>
            <TagMenu />
          </HeaderWrapper>
          <Content>
            <Route path="/file-list/edit/ID3v1" component={TagFormV10} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
