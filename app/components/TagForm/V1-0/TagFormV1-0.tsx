import * as React from 'react';
import { AutoComplete, Col, Form, Input, InputNumber, Row } from 'antd';
import { genres } from '@api/id3v1/domain/genres';
import Genre from '@api/id3v1/domain/genre';

const TextArea = Input.TextArea;

const Option = AutoComplete.Option;

const twoInCol = {
  xs: { span: 22, offset: 1 },
  sm: { span: 22, offset: 1 },
  md: { span: 10, offset: 1 },
};

export class TagFormV10 extends React.Component {
  public render(): JSX.Element {
    return (
      <Form>
        <Row gutter={5} justify="space-around">
          <Col {...twoInCol}>
            <Form.Item label="Title">
              <Input maxLength={30} />
            </Form.Item>
          </Col>
          <Col {...twoInCol}>
            <Form.Item label="Artist">
              <Input maxLength={30} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInCol}>
            <Form.Item label="Album">
              <Input maxLength={30} />
            </Form.Item>
          </Col>
          <Col {...twoInCol}>
            <Form.Item label="Year">
              <InputNumber min={0} precision={0} maxLength={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col span={21} offset={1}>
            <Form.Item label="Comment">
              <TextArea maxLength={30} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInCol}>
            <Form.Item label="Genre">
              <AutoComplete placeholder="Genre">
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
