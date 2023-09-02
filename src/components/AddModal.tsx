import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ICertificate } from "../models/ICertificate";
import { toast } from "react-toastify";

interface AddModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (certificate: ICertificate) => void;
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  datetime: yup.string().required("Datetime is required"),
  tags: yup
    .array()
    .of(yup.string())
    .required("Tags are required")
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return originalValue.split(",").map((tag) => tag.trim());
      }
      return value;
    }),
  price: yup.number().required("Price is required"),
});

const AddModal: React.FC<AddModalProps> = ({ open, onClose, onAdd }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    const newCertificate: ICertificate = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      datetime: data.datetime,
      tags: data.tags,
      price: parseFloat(data.price),
    };

    onAdd(newCertificate);
    onClose();
    reset();
    toast.success("Certificate created successfully", {
      position: "top-center",
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Add New Certificate
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
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: 2 }}
                label="Title"
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: 2 }}
                label="Description"
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
          <Controller
            name="datetime"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: 2 }}
                label="Datetime"
                fullWidth
                error={!!errors.datetime}
                helperText={errors.datetime?.message}
              />
            )}
          />
          <Controller
            name="tags"
            control={control}
            defaultValue={[]}
            render={({ field: { value, onChange } }) => (
              <TextField
                sx={{ marginTop: 2 }}
                label="Tags (comma-separated)"
                fullWidth
                value={value.join(",")}
                onChange={(e) => {
                  const tagsArray = e.target.value
                    .split(",")
                    .map((tag) => tag.trim());
                  onChange(tagsArray);
                }}
                error={!!errors.tags}
                helperText={errors.tags?.message}
              />
            )}
          />
          <Controller
            name="price"
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: 2 }}
                label="Price"
                fullWidth
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
          <DialogActions>
            <Button onClick={onClose}>Close</Button>
            <Button variant="contained" color="secondary" type="submit">
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddModal;
