import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IFilesState } from '@states/iFilesState';
import * as FilesActions from '@actions/filesActions';
import { FileEditor } from '@components/FileEditor/FileEditor';

const mapStateToProps = (state: IFilesState) => ({
  files: state.files,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getFiles: bindActionCreators(FilesActions, dispatch).getFiles,
  addFiles: bindActionCreators(FilesActions, dispatch).addFiles,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileEditor);
