import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { IFilesState } from '@states/iFilesState';
import DragAndDrop from '@components/DragAndDrop/DragAndDrop';
import { addFiles, setFiles } from '@actions/filesActions';

const mapStateToProps = (state: IFilesState) => ({
  files: state.files,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setFiles: bindActionCreators(setFiles, dispatch),
  addFiles: bindActionCreators(addFiles, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragAndDrop);
