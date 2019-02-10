import React, { Component } from 'react';
import { AutoComplete, Button, Col, Form, Input, Row, Select } from 'antd';
import FsUtil from '@api/common/fs/fsUtil';
import ComponentUtil from '@api/common/component/componentUtil';
import ID3Util from '@api/id3/util/id3Util';
import BlobUtil from '@api/common/blob/blobUtil';
import Id3Reader from '@api/id3v2/reader/id3v2Reader';
import Id3Writer from '@api/id3v2/writer/id3v2Writer';
import ID3V2 from '@api/id3v2/domain/2.3/id3v2';
import ID3V2Header from '@api/id3v2/domain/2.3/id3v2Header';
import ID3V2HeaderFlags from '@api/id3v2/domain/2.3/id3v2HeaderFlags';
import ID3V2Frame from '@api/id3v2/domain/2.3/id3v2Frame';
import ID3V2FrameFlags from '@api/id3v2/domain/2.3/id3v2FrameFlags';
import { FrameID } from '@api/id3v2/domain/2.3/frameID';
import Genre from '@api/id3/domain/genre';
import { genres } from '@api/id3/domain/genres';
import SingleUpload from '@components/SingleUpload/SingleUpload';
import { oneInRow, twoInRow } from '@layout/grid';
import { ITagFormV23Props } from './ITagFormV2-3Props';
import { ITagFormV23State } from './ITagFormV2-3State';

const TextArea = Input.TextArea;
const Option = Select.Option;

export class TagFormV23 extends Component<ITagFormV23Props, ITagFormV23State> {
  constructor(props: ITagFormV23Props) {
    super(props);
    this.state = { id3: new ID3V2(new ID3V2Header('23', new ID3V2HeaderFlags(), 0), []) };
    this.saveFile = this.saveFile.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.getFrame = this.getFrame.bind(this);
    this.setFrame = this.setFrame.bind(this);
    this.onGenreInputChange = this.onGenreInputChange.bind(this);
  }

  public async componentWillReceiveProps(nextProps: Readonly<ITagFormV23Props>): Promise<void> {
    this.setState({ id3: await this.constructID3(nextProps) });
  }

  public async componentDidMount(): Promise<void> {
    this.setState({ id3: await this.constructID3() });
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
            <Form.Item label={FrameID.TALB}>
              <Input
                id="TALB"
                name={FrameID.TALB}
                value={this.getFrame('TALB').data}
                onChange={this.setFrame}
              />
            </Form.Item>
          </Col>
          <Col {...twoInRow}>
            <Form.Item label={FrameID.TPE1}>
              <Input
                id="TPE1"
                name={FrameID.TPE1}
                value={this.getFrame('TPE1').data}
                onChange={this.setFrame}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInRow}>
            <Form.Item label={FrameID.TPE2}>
              <Input
                id="TPE2"
                name={FrameID.TPE2}
                value={this.getFrame('TPE2').data}
                onChange={this.setFrame}
              />
            </Form.Item>
          </Col>
          <Col {...twoInRow}>
            <Form.Item label={FrameID.TCOM}>
              <Input
                id="TCOM"
                name={FrameID.TCOM}
                value={this.getFrame('TCOM').data}
                onChange={this.setFrame}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInRow}>
            <Form.Item label={FrameID.TCON}>
              <AutoComplete
                placeholder="Genre"
                value={this.getFrame('TCON').data}
                onChange={this.onGenreInputChange}
              >
                {genres.map((genre: Genre) => (
                  <Option key={genre.index.toString(10)}>{genre.description}</Option>
                ))}
              </AutoComplete>
            </Form.Item>
          </Col>
          <Col {...twoInRow}>
            <Form.Item label={FrameID.TPOS}>
              <Input
                id="TPOS"
                name={FrameID.TPOS}
                value={this.getFrame('TPOS').data}
                onChange={this.setFrame}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInRow}>
            <Form.Item label={FrameID.COMM}>
              <TextArea
                id="COMM"
                name={FrameID.COMM}
                value={this.getFrame('COMM').data}
                onChange={this.setFrame}
              />
            </Form.Item>
          </Col>
          <Col {...twoInRow}>
            <Form.Item label={FrameID.TYER}>
              <Input
                id="TYER"
                name={FrameID.TYER}
                value={this.getFrame('TYER').data}
                onChange={this.setFrame}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={5} justify="space-around">
          <Col {...twoInRow}>
            <Form.Item label={FrameID.TRCK}>
              <Input
                id="TRCK"
                name={FrameID.TRCK}
                value={this.getFrame('TRCK').data}
                onChange={this.setFrame}
              />
            </Form.Item>
          </Col>
          <Col {...twoInRow}>
            <Form.Item label={FrameID.APIC}>
              <SingleUpload apicFrame={this.getFrame('APIC').data} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  public async constructID3(props: ITagFormV23Props = this.props): Promise<ID3V2> {
    const { selectedFile } = props;
    const dataView: DataView = await BlobUtil.blobToDataView(selectedFile.originFileObj);
    let id3: ID3V2;
    if (ID3Util.hasID3V2(dataView)) {
      id3 = Id3Reader.readID3V23(dataView);
    } else {
      id3 = new ID3V2(new ID3V2Header('23', new ID3V2HeaderFlags(), 10), []);
    }
    return id3;
  }

  private getFrame(frameID: string): ID3V2Frame {
    const { id3 } = this.state;
    let frame: ID3V2Frame = ID3Util.findFrame(id3, frameID);
    if (!frame) {
      frame = new ID3V2Frame(frameID, new ID3V2FrameFlags(), '', 0);
      id3.body.push(frame);
    }
    return frame;
  }

  private setFrame(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): ID3V2Frame {
    const target = event.target;
    const { id3 } = this.state;
    const frameID = target.id;
    const frame = ID3Util.findFrame(id3, frameID);
    frame.data = target.value;
    frame.size = target.value.length;
    this.setState({ id3: ID3Util.updateFrame(id3, frame) });
    return frame;
  }

  private onGenreInputChange(value: string): ID3V2Frame {
    const { id3 } = this.state;
    const frame: ID3V2Frame = ID3Util.findFrame(id3, 'TCON');
    frame.data = value;
    frame.size = value.length;
    this.setState({ id3: ID3Util.updateFrame(id3, frame) });
    return frame;
  }

  private async saveFile(): Promise<void> {
    const {
      selectedFile: { originFileObj },
    } = this.props;
    const { id3 } = this.state;
    const electronFile: File = originFileObj;
    await ID3Util.deleteID3V23(originFileObj, id3.header.size);
    await FsUtil.writeToFile(electronFile.path, Id3Writer.convertID3V23ToDataView(id3));
    ComponentUtil.openNotification('Tag has been saved');
  }

  private async deleteTag(): Promise<void> {
    const {
      selectedFile: { originFileObj },
    } = this.props;
    const { id3 } = this.state;
    this.setState({ id3: await ID3Util.deleteID3V23(originFileObj, id3.header.size) });
    ComponentUtil.openNotification('Tag has been deleted');
  }
}
