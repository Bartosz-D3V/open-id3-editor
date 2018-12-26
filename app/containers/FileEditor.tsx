import { connect } from 'react-redux';
import { IFilesState } from '@states/iFilesState';
import { FileEditor } from '@components/FileEditor/FileEditor';

const mapStateToProps = (state: IFilesState) => ({
  files: state.files,
  selectedFile: state.selectedFile,
});

export default connect(mapStateToProps)(FileEditor);
