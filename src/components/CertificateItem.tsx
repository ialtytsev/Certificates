import { FC, useState } from "react";
import { ICertificate } from "../models/ICertificate";

import { TableRow, TableCell, Button, Grid } from "@mui/material";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";

interface CertificateItemProps {
  certificate: ICertificate;
  update: (ICertificate: ICertificate) => void;
  remove: (certificate: ICertificate) => void;
}

const CertificateItem: FC<CertificateItemProps> = ({
  certificate,
  update,
  remove,
}) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    remove(certificate);
    setDeleteModalOpen(false);
  };

  return (
    <TableRow>
      <TableCell>{certificate.datetime}</TableCell>
      <TableCell>{certificate.title}</TableCell>
      <TableCell>{certificate.tags}</TableCell>
      <TableCell>{certificate.description.substring(0, 15)}...</TableCell>
      <TableCell>{certificate.price}</TableCell>
      <TableCell>
        <Grid container spacing={1}>
          <Grid item>
            <Button variant="contained" onClick={() => update(certificate)}>
              <EditNoteOutlinedIcon />
            </Button>
          </Grid>

          <Grid item>
            <Button
              onClick={() => setDeleteModalOpen(true)}
              aria-label="Delete"
              color="error"
              variant="contained"
            >
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      </TableCell>
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDelete}
      />
    </TableRow>
  );
};

export default CertificateItem;
