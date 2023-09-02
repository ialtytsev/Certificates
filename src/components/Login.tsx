import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../features/auth/authApi";
import { Button, TextField, Typography, Grid, Paper } from "@mui/material";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { IUser } from "../models/IUser";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { data: users } = useGetUsersQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (formData: FormData) => {
    const user = users?.find((u: IUser) => u.email === formData.email);

    if (user && user.password === formData.password) {
      navigate("/mainpage");
    } else {
      toast.error("Invalid credentials. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">CERTIFICATES</Typography>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <TextField
              sx={{ marginTop: 2 }}
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              sx={{ marginTop: 2 }}
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
