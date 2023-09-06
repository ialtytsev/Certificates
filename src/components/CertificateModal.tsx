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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (certificate: ICertificate) => void;
  certificate?: ICertificate | null; // Certificate to edit (null for Add)
}

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  datetime: yup.string().required("Datetime is required"),
  tags: yup
    .array()
    .of(yup.string())
    .notRequired()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return originalValue.split(",").map((tag) => tag.trim());
      }
      return value;
    }),
  price: yup.number().required("Price is required"),
});

const CertificateModal: React.FC<CertificateModalProps> = ({
  open,
  onClose,
  onSave,
  certificate,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (certificate) {
      reset({
        title: certificate.title,
        description: certificate.description,
        datetime: certificate.datetime,
        tags: certificate.tags,
        price: certificate.price,
      });
    } else {
      reset();
    }
  }, [reset, certificate]);

  const onSubmit = (data: any) => {
    const updatedCertificate: ICertificate = {
      id: certificate ? certificate.id : Date.now(),
      title: data.title,
      description: data.description,
      datetime: data.datetime,
      tags: data ? data.tags : [],
      price: parseFloat(data.price),
    };

    onSave(updatedCertificate);
    onClose();

    // const toastMessage = certificate
    //   ? "Certificate updated successfully"
    //   : "Certificate created successfully";

    // toast.success(toastMessage, {
    //   position: "top-center",
    // });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {certificate ? "Edit Certificate" : "Add New Certificate"}
        <IconButton
          aria-label="close"
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={() => {
            onClose();
            reset();
          }}
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
                error={!!errors.title}
                helperText={errors.title?.message}
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
                error={!!errors.description}
                helperText={errors.description?.message}
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
                error={!!errors.datetime}
                helperText={errors.datetime?.message}
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
                error={!!errors.tags}
                helperText={errors.tags?.message}
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
                type="number"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
          <DialogActions>
            <Button
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Close
            </Button>
            <Button variant="contained" color="secondary" type="submit">
              {certificate ? "Update" : "Create"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CertificateModal;
