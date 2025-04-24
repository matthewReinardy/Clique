import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
} from "@mui/material";
import { useState, DragEvent, ChangeEvent } from "react";

interface SelectPhotoDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: () => void;
  setSelectedImage: (url: File) => void;
}

export default function SelectPhotoDialog({
  open,
  onClose,
  onUpload,
  setSelectedImage,
}: SelectPhotoDialogProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    // const imageUrl = URL.createObjectURL(file);
    setSelectedImage(file);
    onClose();
    onUpload();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <Box
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          sx={{
            border: "2px dashed #ccc",
            borderRadius: 2,
            p: 10,
            marginY: 10,
            textAlign: "center",
            backgroundColor: isDragging ? "#f0f0f0" : "transparent",
            cursor: "pointer",
          }}
        >
          <Typography variant="body1" color="textSecondary">
            Drag & drop your image here, or click to select
          </Typography>
          <input
            type="file"
            accept="image/*"
            style={{
              opacity: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              cursor: "pointer",
            }}
            onChange={handleFileChange}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
