import { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import httpClient from "../httpClient";
import PageSpinner from "../components/PageSpinner";

const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        if (localStorage.getItem("token") !== null) {
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

      <div className="AppS">
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ "text-align": "center" }}>
            <Typography variant="h2" gutterBottom className="gradient">
              Welcome to refferly!
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ "text-align": "right" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                document.location.href = "/login";
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ "text-align": "left" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                document.location.href = "/signup";
              }}
            >
              Signup
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default LandingPage;
