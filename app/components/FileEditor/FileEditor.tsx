import * as React from 'react';
import { Route } from 'react-router';
import { Layout } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { BasicProps } from 'antd/lib/layout/layout';
import styled from 'styled-components';
import { FileList } from '@components/FileList/FileList';
import { TagMenu } from '@components/TagMenu/TagMenu';
import { TagFormV11 } from '@components/TagForm/TagFormV1-1';
import { IFileEditorProps } from './IFileEditorProps';

const {
  Header,
  Sider,
  Content,
}: {
  Header: React.ComponentClass<BasicProps>;
  Sider: React.ComponentClass<BasicProps>;
  Content: React.ComponentClass<BasicProps>;
} = Layout;

const LayoutWrapper = styled(Layout)`
  background-color: white;
  width: 100%;
`;

const HeaderWrapper = styled(Header)`
  background-color: white;
  width: 100%;
`;

const SiderWrapper = styled(Sider)`
  background-color: white;
  height: 100%;
`;

const ContentWrapper = styled(Content)`
  background-color: white;
  height: 100%;
`;

export class FileEditor extends React.Component<IFileEditorProps> {
  public render(): JSX.Element {
    const { files }: { files: Array<UploadFile> } = this.props;

    return (
      <LayoutWrapper>
        <SiderWrapper>
          <FileList files={files} />
        </SiderWrapper>
        <Layout>
          <HeaderWrapper>
            <TagMenu />
          </HeaderWrapper>
          <ContentWrapper>
            <Route path="/file-list/edit/ID3v1.1" component={TagFormV11} />
          </ContentWrapper>
        </Layout>
      </LayoutWrapper>
    );
  }
}
