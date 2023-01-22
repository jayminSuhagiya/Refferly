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
import NavBar from "../components/NavBar";

const defaultValues = {
  email: "fixed",
  phone: "",
  linkedin: "",
  resume: "",
  portfolio: "",
  type: "Get Referral",
  positions: ["Entry Level"],
  about: "",
  title: "",
  affiliation: "",
  name: "",
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Edit = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const positions = ["Intern", "Entry Level", "Mid Level", "Senior Level"];

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
    <div className="App">
      <NavBar />
      <form onSubmit={handleSubmit}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          spacing={2}
          sx={{ mb: 5, mt: 2 }}
        >
          <Grid item>
            <Typography variant="h4">Edit Profile</Typography>
          </Grid>
          <Grid item>
            <TextField
              required
              sx={{ width: "30vw" }}
              id="name-input"
              name="name"
              label="Name"
              type="text"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              disabled
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
              id="phone-input"
              name="phone"
              label="Phone"
              type="number"
              value={formValues.phone}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              sx={{ width: "30vw" }}
              id="affiliation-input"
              name="affiliation"
              label="University/Company"
              type="text"
              value={formValues.affiliation}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              sx={{ width: "30vw" }}
              id="title-input"
              name="title"
              label="Title (For e.x. SDE2, Sophomore, etc.)"
              type="text"
              value={formValues.title}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              sx={{ width: "30vw" }}
              id="about-input"
              name="about"
              label="About Me"
              type="text"
              value={formValues.about}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              required={formValues.type == "Get Referral"}
              sx={{ width: "30vw" }}
              id="linkedin-input"
              name="linkedin"
              label="Linkedin URL"
              type="text"
              value={formValues.linkedin}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              sx={{ width: "30vw" }}
              id="resume-input"
              name="resume"
              label="Resume Link"
              type="text"
              value={formValues.resume}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              sx={{ width: "30vw" }}
              id="portfolio-input"
              name="portfolio"
              label="Portfolio Link"
              type="text"
              value={formValues.portfolio}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item>
            <Stack
              direction="horizontal"
              alignItems="center"
              justify="center"
              spacing={3}
            >
              <Typography sx={{ pr: 1 }}>I'm here to</Typography>
              <Select
                labelId="type-input"
                id="type-input"
                name="type"
                value={formValues.type}
                label=""
                onChange={handleInputChange}
              >
                <MenuItem value={"Refer"}>Refer</MenuItem>
                <MenuItem value={"Get Referral"}>Get Referral</MenuItem>
              </Select>
              <Typography sx={{ pr: 1, pl: 1 }}> for </Typography>
              <Select
                labelId="positions-input"
                id="positions-input"
                name="positions"
                multiple
                value={formValues.positions}
                onChange={handleInputChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {positions.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>

              <Typography sx={{ pl: 1 }}>
                position{formValues.positions.length > 1 ? "s." : "."}
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <TextField
              sx={{ width: "30vw" }}
              id="about-input"
              name="about"
              label="About Me"
              type="text"
              value={formValues.about}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item sx={{ width: "30vw" }}>
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Edit;
