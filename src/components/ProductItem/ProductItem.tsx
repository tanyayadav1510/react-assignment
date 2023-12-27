import React from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {styles} from './productItem.styles';
import {Typography} from '@mui/material';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  modalId: number | undefined;
  totalItems: number | undefined;
  imageSrc: string | undefined;
  title: string | undefined;
  description: string | undefined;
  moveNext: (currId: number | undefined) => void;
  movePrev: (currId: number | undefined) => void;
};

const ImageWithTitle: React.FC<{ imageSrc: string; title: string; description: string|undefined }> = ({ imageSrc, title, description }) => (
  <div>
    <img src={imageSrc} alt={title || 'Image'} style={styles.image} />
    <Typography variant="h5" style={styles.title}>{title}</Typography>
    <Typography variant="subtitle2" style={styles.title}>{description}</Typography>
  </div>
);

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  modalId,
  totalItems,
  imageSrc,
  title,
  description,
  moveNext,
  movePrev,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth style={styles.modal}>
      <IconButton edge="end" color="inherit" onClick={onClose} style={styles.closeButton}>
        <CloseIcon />
      </IconButton>
      <DialogContent style={styles.content}>
        <div style={styles.imageContainer}>
          <IconButton color="inherit" disabled={modalId === 1} onClick={() => movePrev(modalId)}>
            <ChevronLeft />
          </IconButton>
          {imageSrc && title && <ImageWithTitle imageSrc={imageSrc} title={title} description={description}/>}
          <IconButton color="inherit" disabled={modalId === totalItems} onClick={() => moveNext(modalId)}>
            <ChevronRight />
          </IconButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
