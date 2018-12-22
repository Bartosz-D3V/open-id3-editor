import * as React from 'react';
import { Col, Form, Input, InputNumber, Row, Switch } from 'antd';
import styled from 'styled-components';
import TextArea from 'antd/lib/input/TextArea';

const { TextArea }: { TextArea: TextArea } = Input;

const FormWrapper = styled(Form)`
  background-color: white;
  height: 85vh;
  margin: 0;
  padding: 0;
`;

export class TagFormV10 extends React.Component {
  public render(): JSX.Element {
    return (
      <FormWrapper>
        <Row>
          <Col span={10} offset={1}>
            <Form.Item label="Title">
              <Input />
            </Form.Item>
          </Col>
          <Col span={10} offset={1}>
            <Form.Item label="Artist">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10} offset={1}>
            <Form.Item label="Album">
              <Input />
            </Form.Item>
          </Col>
          <Col span={10} offset={1}>
            <Form.Item label="Year">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={20} offset={1}>
            <Form.Item label="Comment">
              <TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={1}>
            <Form.Item label="Zero-byte">
              <Switch defaultChecked={false} />
            </Form.Item>
          </Col>
          <Col span={6} offset={1}>
            <Form.Item label="Track">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={6} offset={1}>
            <Form.Item label="Genre">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
      </FormWrapper>
    );
  }
}
