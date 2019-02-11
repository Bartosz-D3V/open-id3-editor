import React, { Component } from 'react';
import File from 'electron';
import { AutoComplete, Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { genres } from '@api/id3/domain/genres';
import { oneInRow, threeInRow, twoInRow } from '@layout/grid';
import { ITagFormV11Props } from '@components/TagForm/V1-1/ITagFormV1-1Props';
import { ITagFormV11State } from '@components/TagForm/V1-1/ITagFormV1-1State';
import { ITagFormV10Props } from '@components/TagForm/V1-0/ITagFormV1-0Props';
import Genre from '@api/id3/domain/genre';
import ID3V11 from '@api/id3v1/domain/id3V1-1';
import BlobUtil from '@api/common/blob/blobUtil';
import Id3Util from '@api/id3/util/id3Util';
import Id3Reader from '@api/id3v1/reader/id3Reader';
import FsUtil from '@api/common/fs/fsUtil';
import ID3Writer from '@api/id3v1/writer/id3writer';
import ComponentUtil from '@api/common/component/componentUtil';

const TextArea = Input.TextArea;

const Option = AutoComplete.Option;

export class TagFormV11 extends Component<ITagFormV11Props, ITagFormV11State> {
  constructor(props: ITagFormV10Props) {
    super(props);
    this.state = { id3: new ID3V11() };
    this.saveFile = this.saveFile.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.onYearInputChange = this.onYearInputChange.bind(this);
    this.onTrackNumberChange = this.onTrackNumberChange.bind(this);
    this.onGenreInputChange = this.onGenreInputChange.bind(this);
  }

  public async componentWillReceiveProps(nextProps: Readonly<ITagFormV10Props>): Promise<void> {
    this.setState({ id3: await this.constructID3(nextProps) });
  }

  public async componentDidMount(): Promise<void> {
    this.setState({ id3: await this.constructID3() });
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
                maxLength={28}
                value={id3.album}
                onChange={this.onTextInputChange}
              />
            </Form.Item>
          </Col>
          <Col {...threeInRow}>
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
          <Col {...threeInRow}>
            <Form.Item label="Track number">
              <InputNumber
                name="track"
                min={1}
                precision={0}
                maxLength={2}
                value={id3.zeroByte ? id3.track : null}
                onChange={this.onTrackNumberChange}
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

  public async constructID3(props: ITagFormV10Props = this.props): Promise<ID3V11> {
    const { selectedFile } = props;
    const dataView: DataView = await BlobUtil.blobToDataView(selectedFile.originFileObj);
    let id3: ID3V11;
    if (Id3Util.hasID3V1(dataView)) {
      id3 = Id3Reader.readID3V11(dataView);
    } else {
      id3 = new ID3V11();
    }
    return id3;
  }

  private async saveFile(): Promise<void> {
    const {
      selectedFile: { originFileObj },
    } = this.props;
    const { id3 } = this.state;
    const electronFile: File = originFileObj;
    await Id3Util.deleteID3V11(originFileObj);
    await FsUtil.writeToFile(electronFile.path, ID3Writer.convertID3V11ToDataView(id3));
    ComponentUtil.openNotification('Tag has been saved');
  }

  private async deleteTag(): Promise<void> {
    const {
      selectedFile: { originFileObj },
    } = this.props;
    this.setState({ id3: await Id3Util.deleteID3V11(originFileObj) });
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

  private onTrackNumberChange(value: number): void {
    const { id3 } = this.state;
    id3.track = value;
    this.setState({ id3 });
  }

  private onGenreInputChange(value: string): void {
    const { id3 } = this.state;
    id3.genre = Id3Util.convertIndexToGenre(Number.parseInt(value, 10));
    this.setState({ id3 });
  }
}
