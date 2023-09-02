import { useEffect, useState } from "react";
import { ICertificate } from "../models/ICertificate";
import {
  useCreateCertificateMutation,
  useDeleteCertificateMutation,
  useFetchAllCertificatesQuery,
  useSearchCertificatesQuery,
  useUpdateCertificateMutation,
} from "../features/certificates/certificateApi";
import CertificateItem from "./CertificateItem";
import { useDebounce } from "../hooks/debounce";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  Paper,
  TableRow,
  TableCell,
  Container,
  Grid,
  Box,
  Button,
  TextField,
} from "@mui/material";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import AddIcon from "@mui/icons-material/Add";
import { useLocation, useNavigate } from "react-router-dom";

const CertificatesContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<ICertificate | null>(null);

  const debounced = useDebounce(search);
  const {
    data: certificates,
    error,
    isLoading,
  } = useFetchAllCertificatesQuery(100);
  const [createCertificate, {}] = useCreateCertificateMutation();
  const [updateCertificate, {}] = useUpdateCertificateMutation();
  const [deleteCertificate, {}] = useDeleteCertificateMutation();

  const { data: searchedData, isLoading: isSearchedLoading } =
    useSearchCertificatesQuery(debounced, {
      skip: debounced.length < 3,
      refetchOnFocus: true,
    });

  // When the location changes (e.g., due to URL changes), update the search state
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchParam = queryParams.get("search");
    if (searchParam) {
      setSearch(searchParam);
    }
  }, [location.search]);

  // When the search state changes, update the URL query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set("search", search);
    navigate({ search: queryParams.toString() });
  }, [search, navigate]);

  const handleCreate = async (certificate: ICertificate) => {
    await createCertificate(certificate);
    setIsModalOpen(false);
  };

  const handleUpdate = (certificate: ICertificate) => {
    updateCertificate(certificate);
    setEditModalOpen(false);
  };

  const handleRemove = (certificate: ICertificate) => {
    deleteCertificate(certificate);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <Grid container mb={2} spacing={2} justifyContent="space-between">
        <Grid item xs={9}>
          <TextField
            type="text"
            placeholder="Search title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="medium"
            onClick={() => navigate({ search: `?search=${search}` })}
          >
            Search
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsModalOpen(true)}
            endIcon={<AddIcon />}
            size="medium"
          >
            Add
          </Button>
          <AddModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAdd={handleCreate}
          />
        </Grid>
      </Grid>
      {isLoading && <h1>Loading</h1>}
      {error && <h1>Error is occurred</h1>}

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="simple Table">
            <TableHead>
              <TableRow>
                <TableCell>DATETIME</TableCell>
                <TableCell>TITLE</TableCell>
                <TableCell>TAGS</TableCell>
                <TableCell>DESCRIPTION</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {debounced.length < 3 ? (
                certificates &&
                certificates.map((certificate) => (
                  <CertificateItem
                    update={() => {
                      setSelectedCertificate(certificate);
                      setEditModalOpen(true);
                    }}
                    remove={handleRemove}
                    key={certificate.id}
                    certificate={certificate}
                  />
                ))
              ) : isSearchedLoading ? (
                <h1>Search Loading...</h1>
              ) : searchedData ? (
                searchedData.map((c: ICertificate) => (
                  <CertificateItem
                    update={() => {
                      setSelectedCertificate(c);
                      setEditModalOpen(true);
                    }}
                    remove={handleRemove}
                    key={c.id}
                    certificate={c}
                  />
                ))
              ) : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {selectedCertificate && (
        <EditModal
          open={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onEdit={handleUpdate}
          certificate={selectedCertificate}
        />
      )}
    </Container>
  );
};

export default CertificatesContainer;
