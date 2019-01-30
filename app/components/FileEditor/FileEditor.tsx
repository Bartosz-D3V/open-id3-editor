import React, { Component } from 'react';
import { Route, RouteComponentProps } from 'react-router';
import { Layout } from 'antd';
import { standardContainer } from '@hoc/StandardContainer/StandardContainer';
import { FileList } from '@components/FileList/FileList';
import { TagMenu } from '@components/TagMenu/TagMenu';
import { TagFormV11 } from '@components/TagForm/V1-1/TagFormV1-1';
import { TagFormV10 } from '@components/TagForm/V1-0/TagFormV1-0';
import { TagFormV22 } from '@components/TagForm/V2-2/TagFormV2-2';
import { IFileEditorProps } from './IFileEditorProps';

const LayoutWrapper = standardContainer(Layout);

const HeaderWrapper = standardContainer(Layout.Header);

const SiderWrapper = standardContainer(Layout.Sider);

const ContentWrapper = standardContainer(Layout.Content);

export class FileEditor extends Component<IFileEditorProps> {
  constructor(props: IFileEditorProps) {
    super(props);
    this.renderTagFormV10 = this.renderTagFormV10.bind(this);
    this.renderTagFormV11 = this.renderTagFormV11.bind(this);
  }

  public renderTagFormV10(props: RouteComponentProps): JSX.Element {
    const { selectedFile } = this.props;
    return <TagFormV10 {...props} selectedFile={selectedFile} />;
  }

  public renderTagFormV11(props: RouteComponentProps): JSX.Element {
    const { selectedFile } = this.props;
    return <TagFormV11 {...props} selectedFile={selectedFile} />;
  }

  public renderTagFormV22(props: RouteComponentProps): JSX.Element {
    const { selectedFile } = this.props;
    return <TagFormV22 {...props} selectedFile={selectedFile} />;
  }

  public componentDidMount(): void {
    const { files, selectFile } = this.props;
    selectFile(files[0].uid);
  }

  public render(): JSX.Element {
    const { files } = this.props;

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
            <Route path="/file-list/edit/ID3v1.0" render={this.renderTagFormV10} />
            <Route path="/file-list/edit/ID3v1.1" render={this.renderTagFormV11} />
            <Route path="/file-list/edit/ID3v2.2" render={this.renderTagFormV22} />
          </ContentWrapper>
        </Layout>
      </LayoutWrapper>
    );
  }
}
