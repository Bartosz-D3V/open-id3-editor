import { RouteComponentProps } from 'react-router';

export interface IDragAndDropProps extends RouteComponentProps {
  addFiles: <T extends File>(files: Array<T>) => void;
}
