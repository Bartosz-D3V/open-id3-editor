import { RouteComponentProps } from 'react-router';
import { addFiles } from '@actions/filesActions';

export interface IDragAndDropProps extends RouteComponentProps {
  addFiles?: typeof addFiles;
}
