import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IAppState } from '@states/iAppState';
import * as FilesActions from '@actions/files/filesActions';
import DragAndDrop from '@components/DragAndDrop/DragAndDrop';

const mapStateToProps = (state: IAppState) => ({
  files: state.filesState.files,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFiles: bindActionCreators(FilesActions, dispatch).setFiles,
  addFiles: bindActionCreators(FilesActions, dispatch).addFiles,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragAndDrop);
