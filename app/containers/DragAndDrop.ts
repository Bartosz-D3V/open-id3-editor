import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as FilesActions from '../actions/filesActions';
import { DragAndDrop } from '../components/DragAndDrop/DragAndDrop';
import { IFilesState } from '../states/iFilesState';

const mapStateToProps = (state: IFilesState) => ({
  files: state.files,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getFiles: bindActionCreators(FilesActions, dispatch).getFiles,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragAndDrop);
