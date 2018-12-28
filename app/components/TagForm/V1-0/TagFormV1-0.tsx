import React, { Component } from 'react';
import { AutoComplete, Col, Form, Input, InputNumber, Row } from 'antd';
import { ITagFormV10Props } from '@components/TagForm/V1-0/ITagFormV1-0Props';
import { genres } from '@api/id3v1/domain/genres';
import Genre from '@api/id3v1/domain/genre';
import Mp3Util from '@api/common/mp3/mp3Util';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3V10 from '@api/id3v1/domain/id3V1-0';
import Id3Reader from '@api/id3v1/id3Reader';
import blobUtil from '@api/common/blob/blobUtil';

const TextArea = Input.TextArea;

const Option = AutoComplete.Option;

const twoInCol = {
  xs: { span: 22, offset: 1 },
  sm: { span: 22, offset: 1 },
  md: { span: 10, offset: 1 },
};

export class TagFormV10 extends Component<ITagFormV10Props> {
  private state = {
    id3: ID3V10,
  };

  public async componentDidMount(): Promise<void> {
    const { selectedFile } = this.props;
    const dataView: DataView = await BlobUtil.blobToDataView(selectedFile.originFileObj);
    if (Mp3Util.hasID3V1(dataView)) {
      const id3: ID3V10 = Id3Reader.readID3V10(dataView);
      this.setState({ id3 });
    }
  }

  public render(): JSX.Element {
    const { id3 }: { id3: ID3V10 } = this.state;

    return (
      <Form>
        <Row gutter={5} justify="space-around">
          <Col {...twoInCol}>
            <Form.Item label="Title">
              <Input maxLength={30} value={id3.title} />
            </Form.Item>
          </Col>
          <Col {...twoInCol}>
            <Form.Item label="Artist">
              <Input maxLength={30} value={id3.artist} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInCol}>
            <Form.Item label="Album">
              <Input maxLength={30} value={id3.album} />
            </Form.Item>
          </Col>
          <Col {...twoInCol}>
            <Form.Item label="Year">
              <InputNumber min={0} precision={0} maxLength={4} value={id3.year} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col span={21} offset={1}>
            <Form.Item label="Comment">
              <TextArea maxLength={30} value={id3.comment} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInCol}>
            <Form.Item label="Genre">
              <AutoComplete placeholder="Genre" value={id3.genre}>
                {genres.map((genre: Genre) => (
                  <Option key={genre.num}>{genre.genre}</Option>
                ))}
              </AutoComplete>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}
