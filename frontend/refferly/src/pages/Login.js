import React, { useState } from "react";
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

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };
  return (
    <>
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
