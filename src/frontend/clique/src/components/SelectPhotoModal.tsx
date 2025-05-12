import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

export interface SelectPhotoDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: () => void;
}

const SelectPhotoDialog: React.FC<SelectPhotoDialogProps> = ({
  open,
  onClose,
  onUpload,
}) => {
  const theme = useTheme();
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ backgroundColor: theme.palette.customColors.buff }}>
        Create New Post
      </DialogTitle>
      <Button sx={{ borderRadius: 0 }}>Select from computer</Button>

      {/* opens CreatePostModal */}
      <Button sx={{ borderRadius: 0 }} onClick={onUpload}>
        Upload
      </Button>
    </Dialog>
  );
};

export default SelectPhotoDialog;
