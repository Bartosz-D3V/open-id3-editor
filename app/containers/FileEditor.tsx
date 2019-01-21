import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IFilesState } from '@states/iFilesState';
import { FileEditor } from '@components/FileEditor/FileEditor';
import { selectFile } from '@actions/filesActions';

const mapStateToProps = (state: IFilesState) => ({
  files: state.files,
  selectedFile: state.selectedFile,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectFile: bindActionCreators(selectFile, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FileEditor);
