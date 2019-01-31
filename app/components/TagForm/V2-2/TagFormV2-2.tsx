import React, { Component } from 'react';
import { AutoComplete, Button, Col, Form, Input, Row } from 'antd';
import { oneInRow, twoInRow } from '@layout/grid';
import { ITagFormV22Props } from '@components/TagForm/V2-2/ITagFormV2-2Props';
import { ITagFormV22State } from '@components/TagForm/V2-2/ITagFormV2-2State';
import ID3V2 from '@api/id3v2/domain/2.2/id3v2';
import ID3V2Header from '@api/id3v2/domain/2.2/id3v2Header';
import ID3V2HeaderFlags from '@api/id3v2/domain/2.2/id3v2HeaderFlags';
import BlobUtil from '@api/common/blob/blobUtil';
import ID3Util from '@api/id3/util/id3Util';
import Id3Reader from '@api/id3v2/reader/id3v2Reader';
import FsUtil from '@api/common/fs/fsUtil';
import Id3Writer from '@api/id3v2/writer/id3v2Writer';
import ComponentUtil from '@api/common/component/componentUtil';
import { FrameID } from '@api/id3v2/domain/2.2/frameID';
import ID3V2Frame from '@api/id3v2/domain/2.2/id3v2Frame';
import { bool } from 'prop-types';

export class TagFormV22 extends Component<ITagFormV22Props, ITagFormV22State> {
  constructor(props: ITagFormV22Props) {
    super(props);
    this.state = { id3: new ID3V2(new ID3V2Header('22', new ID3V2HeaderFlags(), 0), []) };
    this.saveFile = this.saveFile.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.getFrame = this.getFrame.bind(this);
    this.setFrame = this.setFrame.bind(this);
    // this.onYearInputChange = this.onYearInputChange.bind(this);
    // this.onTrackNumberChange = this.onTrackNumberChange.bind(this);
    // this.onGenreInputChange = this.onGenreInputChange.bind(this);
  }

  public async componentWillReceiveProps(nextProps: Readonly<ITagFormV22Props>): Promise<void> {
    const id3: ID3V2 = await this.constructID3(nextProps);
    this.setState({ id3 });
  }

  public async componentDidMount(): Promise<void> {
    const id3: ID3V2 = await this.constructID3();
    this.setState({ id3 });
  }

  public render(): JSX.Element {
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
            <Form.Item label={FrameID.TAL}>
              <Input
                id="TAL"
                name={FrameID.TAL}
                value={this.getFrame('TAL').data}
                onChange={this.setFrame}
              />
            </Form.Item>
          </Col>
          <Col {...twoInRow}>
            <Form.Item label={FrameID.TBP}>
              <Input
                name={FrameID.TBP}
                value={this.getFrame('TBP').data}
                // onChange={this.onTextInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInRow}>
            <Form.Item label={FrameID.TCM}>
              <Input
                name={FrameID.TCM}
                value={this.getFrame('TCM').data}
                // onChange={this.onTextInputChange}
              />
            </Form.Item>
          </Col>
          <Col {...twoInRow}>
            <Form.Item label={FrameID.TCO}>
              <Input
                name={FrameID.TCO}
                value={this.getFrame('TCO').data}
                // onChange={this.onTextInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInRow}>
            <Form.Item label={FrameID.TCR}>
              <Input
                name={FrameID.TCR}
                value={this.getFrame('TCR').data}
                // onChange={this.onTextInputChange}
              />
            </Form.Item>
          </Col>
          <Col {...twoInRow}>
            <Form.Item label={FrameID.TDA}>
              <Input
                name={FrameID.TDA}
                value={this.getFrame('TDA').data}
                // onChange={this.onTextInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  public getFrame(frameID: string): ID3V2Frame {
    const { id3 } = this.state;
    const frame: ID3V2Frame = id3.body.find(v => v.frameID === frameID);
    return frame ? frame : new ID3V2Frame(frameID, '');
  }

  public setFrame(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const { id3 } = this.state;
    const frameId = target.id;
    const frame = id3.body.find(v => v.frameID === frameId);
    id3.body.splice(id3.body.indexOf(frame), 0);
    id3.body.push(frame);
    console.log(id3.body);
  }

  public async constructID3(props: ITagFormV22Props = this.props): Promise<ID3V2> {
    const { selectedFile } = props;
    const dataView: DataView = await BlobUtil.blobToDataView(selectedFile.originFileObj);
    let id3: ID3V2;
    if (ID3Util.hasID3V2(dataView)) {
      id3 = Id3Reader.readID3V22(dataView);
    } else {
      id3 = new ID3V2(new ID3V2Header('22', new ID3V2HeaderFlags(), 0), []);
    }
    return id3;
  }

  private async saveFile(): Promise<void> {
    const {
      selectedFile: { originFileObj },
    } = this.props;
    const { id3 } = this.state;
    const electronFile: File = originFileObj;
    await ID3Util.deleteID3V22(originFileObj, id3.header.size);
    await FsUtil.writeToFile(electronFile.path, Id3Writer.convertID3V22ToDataView(id3));
    ComponentUtil.openNotification('Tag has been saved');
  }

  private async deleteTag(): Promise<void> {
    const {
      selectedFile: { originFileObj },
    } = this.props;
    const { id3 } = this.state;
    this.setState({ id3: await ID3Util.deleteID3V22(originFileObj, id3.header.size) });
    ComponentUtil.openNotification('Tag has been deleted');
  }
}
