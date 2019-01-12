import React, { Component } from 'react';
import { AutoComplete, Button, Col, Form, Input, InputNumber, Row } from 'antd';
import File from 'electron';
import { ITagFormV10Props } from '@components/TagForm/V1-0/ITagFormV1-0Props';
import { ITagFormV10State } from '@components/TagForm/V1-0/ITagFormV1-0State';
import { genres } from '@api/id3v1/domain/genres';
import { oneInRow, twoInRow } from '@layout/grid';
import Mp3Util from '@api/common/mp3/mp3Util';
import BlobUtil from '@api/common/blob/blobUtil';
import FsUtil from '@api/common/fs/fsUtil';
import ComponentUtil from '@api/common/component/componentUtil';
import Genre from '@api/id3v1/domain/genre';
import ID3V10 from '@api/id3v1/domain/id3V1-0';
import Id3Reader from '@api/id3v1/reader/id3Reader';
import Id3Writer from '@api/id3v1/writer/id3Writer';

const TextArea = Input.TextArea;

const Option = AutoComplete.Option;

export class TagFormV10 extends Component<ITagFormV10Props, ITagFormV10State> {
  constructor(props: ITagFormV10Props) {
    super(props);
    this.state = { id3: new ID3V10() };
    this.saveFile = this.saveFile.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.onYearInputChange = this.onYearInputChange.bind(this);
    this.onGenreInputChange = this.onGenreInputChange.bind(this);
  }

  public async componentWillReceiveProps(nextProps: Readonly<ITagFormV10Props>): Promise<void> {
    const id3: ID3V10 = await this.constructID3(nextProps);
    this.setState({ id3 });
  }

  public async componentDidMount(): Promise<void> {
    const id3: ID3V10 = await this.constructID3();
    this.setState({ id3 });
  }

  public render(): JSX.Element {
    const { id3 } = this.state;
    return (
      <Form>
        <Row gutter={5} justify="center">
          <Col {...oneInRow}>
            <Form.Item>
              <Button block type="primary" htmlType="button" onClick={this.saveFile}>
                Save tag
              </Button>
            </Form.Item>
          </Col>
          <Col {...oneInRow}>
            <Form.Item>
              <Button block type="danger" htmlType="button" onClick={this.deleteTag}>
                Delete tag
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInRow}>
            <Form.Item label="Title">
              <Input
                name="title"
                maxLength={30}
                value={id3.title}
                onChange={this.onTextInputChange}
              />
            </Form.Item>
          </Col>
          <Col {...twoInRow}>
            <Form.Item label="Artist">
              <Input
                name="artist"
                maxLength={30}
                value={id3.artist}
                onChange={this.onTextInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInRow}>
            <Form.Item label="Album">
              <Input
                name="album"
                maxLength={30}
                value={id3.album}
                onChange={this.onTextInputChange}
              />
            </Form.Item>
          </Col>
          <Col {...twoInRow}>
            <Form.Item label="Year">
              <InputNumber
                name="year"
                min={0}
                precision={0}
                maxLength={4}
                value={id3.year}
                onChange={this.onYearInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col span={21} offset={1}>
            <Form.Item label="Comment">
              <TextArea
                name="comment"
                maxLength={30}
                value={id3.comment}
                onChange={this.onTextInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInRow}>
            <Form.Item label="Genre">
              <AutoComplete
                placeholder="Genre"
                value={id3.genre && id3.genre.index > -1 ? id3.genre.index.toString(10) : ''}
                onChange={this.onGenreInputChange}
              >
                {genres.map((genre: Genre) => (
                  <Option key={genre.index.toString(10)}>{genre.description}</Option>
                ))}
              </AutoComplete>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  public async constructID3(props: ITagFormV10Props = this.props): Promise<ID3V10> {
    const { selectedFile } = props;
    const dataView: DataView = await BlobUtil.blobToDataView(selectedFile.originFileObj);
    let id3: ID3V10;
    if (Mp3Util.hasID3V1(dataView)) {
      id3 = Id3Reader.readID3V10(dataView);
    } else {
      id3 = new ID3V10();
    }
    return id3;
  }

  private async saveFile(): Promise<void> {
    const {
      selectedFile: { originFileObj },
    } = this.props;
    const { id3 } = this.state;
    const electronFile: File = originFileObj;
    await Mp3Util.deleteID3V10(originFileObj);
    await FsUtil.writeToFile(electronFile.path, Id3Writer.convertID3V10ToDataView(id3));
    ComponentUtil.openNotification('Tag has been saved');
  }

  private async deleteTag(): Promise<void> {
    const {
      selectedFile: { originFileObj },
    } = this.props;
    this.setState({ id3: await Mp3Util.deleteID3V10(originFileObj) });
    ComponentUtil.openNotification('Tag has been deleted');
  }

  private onTextInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const target = event.target;
    const { id3 } = this.state;
    id3[target.name] = target.value;
    this.setState({ id3 });
  }

  private onYearInputChange(value: number): void {
    const { id3 } = this.state;
    id3.year = value;
    this.setState({ id3 });
  }

  private onGenreInputChange(value: string): void {
    const { id3 } = this.state;
    id3.genre = Id3Reader.convertIndexToGenre(Number.parseInt(value, 10));
    this.setState({ id3 });
  }
}
