import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IFilesState } from '@states/iFilesState';
import DragAndDrop from '@components/DragAndDrop/DragAndDrop';
import * as FilesActions from '@actions/filesActions';

const mapStateToProps = (state: IFilesState) => ({
  files: state.files,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFiles: bindActionCreators(FilesActions, dispatch).setFiles,
  addFiles: bindActionCreators(FilesActions, dispatch).addFiles,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragAndDrop);
