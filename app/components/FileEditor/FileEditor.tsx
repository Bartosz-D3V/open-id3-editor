import * as React from 'react';
import { Route } from 'react-router';
import { Layout } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import { FileList } from '@components/FileList/FileList';
import { TagMenu } from '@components/TagMenu/TagMenu';
import { TagFormV11 } from '@components/TagForm/V1-1/TagFormV1-1';
import { TagFormV10 } from '@components/TagForm/V1-0/TagFormV1-0';
import { standardContainer } from '@hoc/StandardContainer/StandardContainer';
import { IFileEditorProps } from './IFileEditorProps';

const LayoutWrapper = standardContainer(Layout);

const HeaderWrapper = standardContainer(Layout.Header);

const SiderWrapper = standardContainer(Layout.Sider);

const ContentWrapper = standardContainer(Layout.Content);

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
            <Route path="/file-list/edit/ID3v1.0" component={TagFormV10} />
            <Route path="/file-list/edit/ID3v1.1" component={TagFormV11} />
          </ContentWrapper>
        </Layout>
      </LayoutWrapper>
    );
  }
}
