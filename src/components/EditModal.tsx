import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useForm, Controller } from "react-hook-form";
import { ICertificate } from "../models/ICertificate";
import { toast } from "react-toastify";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  onEdit: (certificate: ICertificate) => void;
  certificate: ICertificate;
}

const EditModal: React.FC<EditModalProps> = ({
  open,
  onClose,
  onEdit,
  certificate,
}) => {
  const { handleSubmit, control, reset } = useForm();

  useEffect(() => {
    reset({
      title: certificate.title,
      description: certificate.description,
      datetime: certificate.datetime,
      tags: certificate.tags,
      price: certificate.price,
    });
  }, [reset, certificate]);

  const onSubmit = (data: any) => {
    const updatedCertificate: ICertificate = {
      id: certificate.id,
      title: data.title,
      description: data.description,
      datetime: data.datetime,
      tags: data.tags,
      price: data.price,
    };

    onEdit(updatedCertificate);
    onClose();

    toast.success("Certificate updated successfully", {
      position: "top-center",
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Edit certificate
        <IconButton
          aria-label="close"
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: 2 }}
                label="Title"
                fullWidth
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: 2 }}
                label="Description"
                fullWidth
                multiline
                rows={4}
              />
            )}
          />
          <Controller
            name="datetime"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: 2 }}
                label="Datetime"
                fullWidth
              />
            )}
          />
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: 2 }}
                label="Tags"
                fullWidth
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: 2 }}
                label="Price"
                fullWidth
              />
            )}
          />
          <DialogActions>
            <Button onClick={onClose}>Close</Button>
            <Button variant="contained" color="secondary" type="submit">
              Update
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
