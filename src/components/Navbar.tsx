import React from "react";
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../features/auth/authApi";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUserQuery();

  const onLogout = () => {
    navigate("/");
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          CERTIFICATES
        </Typography>
        <div>
          <Grid container spacing={1}>
            <Grid item>
              <Button variant="text">
                <Typography variant="h6" color="WindowText">
                  {isLoading ? "Loading..." : user?.username || "Profile"}
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button variant="text" onClick={onLogout}>
                <Typography variant="h6" color="WindowText">
                  Logout
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
