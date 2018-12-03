import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as FilesActions from '../actions/filesActions';
import { DragAndDrop } from '../components/DragAndDrop/DragAndDrop';
import { FilesState } from '../states/filesState';

const mapStateToProps = (state: FilesState) => ({
  files: state.files,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(FilesActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragAndDrop);
