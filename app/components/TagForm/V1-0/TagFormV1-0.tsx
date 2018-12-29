import React, { Component } from 'react';
import { AutoComplete, Col, Form, Input, InputNumber, Row } from 'antd';
import { ITagFormV10Props } from '@components/TagForm/V1-0/ITagFormV1-0Props';
import { ITagFormV10State } from '@components/TagForm/V1-0/ITagFormV1-0State';
import { genres } from '@api/id3v1/domain/genres';
import Genre from '@api/id3v1/domain/genre';
import Mp3Util from '@api/common/mp3/mp3Util';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V10 from '@api/id3v1/domain/id3V1-0';
import Id3Reader from '@api/id3v1/id3Reader';
import { SelectValue } from 'antd/lib/select';

const TextArea = Input.TextArea;

const Option = AutoComplete.Option;

const twoInCol = {
  xs: { span: 22, offset: 1 },
  sm: { span: 22, offset: 1 },
  md: { span: 10, offset: 1 },
};

export class TagFormV10 extends Component<ITagFormV10Props, ITagFormV10State> {
  constructor(props: ITagFormV10Props) {
    super(props);
    this.state = { id3: null };
    this.onTextInputChange = this.onTextInputChange.bind(this);
    this.onYearInputChange = this.onYearInputChange.bind(this);
    this.onGenreInputChange = this.onGenreInputChange.bind(this);
  }

  public componentWillReceiveProps(nextProps: Readonly<ITagFormV10Props>, nextContext: any): void {
    this.constructID3(nextProps);
  }

  public async componentDidMount(): Promise<void> {
    this.constructID3();
  }

  public render(): JSX.Element {
    const { id3 } = this.state;
    if (id3 === null) return <div />;

    return (
      <Form>
        <Row gutter={5} justify="space-around">
          <Col {...twoInCol}>
            <Form.Item label="Title">
              <Input
                name="title"
                maxLength={30}
                value={id3.title}
                onChange={this.onTextInputChange}
              />
            </Form.Item>
          </Col>
          <Col {...twoInCol}>
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
          <Col {...twoInCol}>
            <Form.Item label="Album">
              <Input
                name="album"
                maxLength={30}
                value={id3.album}
                onChange={this.onTextInputChange}
              />
            </Form.Item>
          </Col>
          <Col {...twoInCol}>
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
          <Col {...twoInCol}>
            <Form.Item label="Genre">
              <AutoComplete
                placeholder="Genre"
                value={id3.genre ? id3.genre.index.toString(10) : ''}
                onChange={this.onGenreInputChange}
              >
                {genres.map((genre: Genre) => (
                  <Option key={genre.index.toString(10)}>{genre.genre}</Option>
                ))}
              </AutoComplete>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
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

  private async constructID3(props: ITagFormV10Props = this.props): Promise<void> {
    const { selectedFile } = props;
    const dataView: DataView = await BlobUtil.blobToDataView(selectedFile.originFileObj);
    let id3: ID3V10;
    if (Mp3Util.hasID3V1(dataView)) {
      id3 = Id3Reader.readID3V10(dataView);
    } else {
      id3 = new ID3V10();
    }
    this.setState({ id3 });
  }
}
