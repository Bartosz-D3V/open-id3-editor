import { RouteComponentProps } from 'react-router';
import { addFiles, setFiles } from '@actions/files/filesActions';

export interface IDragAndDropProps extends RouteComponentProps {
  addFiles?: typeof addFiles;
  setFiles?: typeof setFiles;
}
