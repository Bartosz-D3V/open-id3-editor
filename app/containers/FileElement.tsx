import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IFilesState } from '@states/iFilesState';
import * as FilesActions from '@actions/filesActions';
import { FileElement } from '@components/FileElement/FileElement';
import { IFileElementProps } from '@components/FileElement/IFileElementProps';

const mapStateToProps = (state: IFilesState, ownProps: IFileElementProps) => ({
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
