import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as FilesActions from '@actions/files/filesActions';
import { FileElement } from '@components/FileElement/FileElement';
import { IFileElementProps } from '@components/FileElement/IFileElementProps';
import { IAppState } from '@states/iAppState';

const mapStateToProps = (state: IAppState, ownProps: IFileElementProps) => ({
  filename: ownProps.filename,
  uid: ownProps.uid,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectFile: bindActionCreators(FilesActions, dispatch).selectFile,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileElement);
