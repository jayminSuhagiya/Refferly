import { useEffect, useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import Match from "../components/Match";
import NavBar from "../components/NavBar";
import httpClient from "../httpClient";
import PageSpinner from "../components/PageSpinner";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (localStorage.getItem("token") == null) {
        document.location.href = "/";
      }
      setToken(localStorage.getItem("token"));
      await httpClient
        .get("matched", { headers: { token: localStorage.getItem("token") } })
        .then((res) => {
          setMatches(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          alert("Something went wrong!");
          setIsLoading(false);
        });
    })();
  }, []);

  return (
    <>
      {isLoading && <PageSpinner />}
      <div className="App">
        <NavBar />
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          spacing={2}
          sx={{ pt: 3, pb: 3 }}
        >
          {matches.map((match) => (
            <Match data={match} />
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Matches;
