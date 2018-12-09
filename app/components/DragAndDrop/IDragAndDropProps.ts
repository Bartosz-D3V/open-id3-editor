import { ImageFile } from 'react-dropzone';
import { RouteComponentProps } from 'react-router';

export interface IDragAndDropProps extends RouteComponentProps {
  addFiles: (files: Array<ImageFile>) => void;
}
