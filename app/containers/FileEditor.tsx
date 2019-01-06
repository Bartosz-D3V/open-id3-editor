import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as FilesActions from '@actions/files/filesActions';
import { FileEditor } from '@components/FileEditor/FileEditor';
import { IAppState } from '@states/iAppState';

const mapStateToProps = (state: IAppState) => ({
  files: state.filesState.files,
  selectedFile: state.filesState.selectedFile,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectFile: bindActionCreators(FilesActions, dispatch).selectFile,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileEditor);
