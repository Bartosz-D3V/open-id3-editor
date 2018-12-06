import { ImageFile } from 'react-dropzone';

export interface IDragAndDropProps {
  addFiles: (files: Array<ImageFile>) => void;
}
