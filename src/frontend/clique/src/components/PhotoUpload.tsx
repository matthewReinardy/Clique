import { Button, Input } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

interface PhotoUploadProps {
  handleFileUpload: Dispatch<SetStateAction<File | null>>;
}

const PhotoUpload = ({ handleFileUpload }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div>
      <h3>Upload a Photo</h3>
      <Input type="file" onChange={handleFileChange} />
      {preview && (
        <div>
          <img
            src={preview}
            alt="Preview"
            style={{ width: 200, marginTop: 10 }}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
