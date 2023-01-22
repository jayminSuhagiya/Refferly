import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  MenuItem,
  Select,
  Stack,
  Box,
  Chip,
  Button,
} from "@mui/material";
import PageSpinner from "../components/PageSpinner";
import httpClient from "../httpClient";

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    httpClient
      .post("login", formValues)
      .then((res) => {
        setToken(res.data.token);
        setUser(formValues.email);
        localStorage.setItem("token", res.data.token);
        httpClient.get("user", { headers: { token: token } }).then((res) => {
          setUserType(res.data.type === "1" ? "Get Referral" : "Refer");
        });
        document.location.href = "/home";
        setIsLoading(false);
      })
      .catch((err) => {
        alert("Login Failed! ");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    (async () => {
      try {
        if (localStorage.getItem("token") !== null) {
          setToken(localStorage.getItem("token"));
          setUser(localStorage.getItem("user"));
          setIsLoading(false);
          document.location.href = "/home";
        }
        setIsLoading(false);
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <PageSpinner />}
      <>
        <form className="AppS" onSubmit={handleSubmit}>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h4">Login to Refferly</Typography>
            </Grid>
            <Grid item>
              <TextField
                sx={{ width: "30vw" }}
                id="email-input"
                name="email"
                label="Email"
                type="text"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item>
              <TextField
                sx={{ width: "30vw" }}
                id="password-input"
                name="password"
                label="Password"
                type="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item sx={{ width: "30vw" }}>
              <Button variant="contained" onClick={handleSubmit}>
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    </>
  );
};

export default Login;
