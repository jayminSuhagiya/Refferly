import { useState, useEffect } from "react";
import { Grid, Button, Typography, Snackbar, Alert } from "@mui/material";
import NavBar from "../components/NavBar";
import TinderCard from "react-tinder-card";
import Match from "../components/Match";
import httpClient from "../httpClient";

const Home = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;
  const [userType, setUserType] = useState(null);

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const onSwipe = (direction, id) => {
    httpClient
      .post(
        "swipe",
        { swipe_on: id, type: direction === "left" ? 0 : 1 },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.data.matched) setState({ ...state, open: true });
      })
      .catch((err) => {
        alert("Something went wrong!");
      });
  };
  const onCardLeftScreen = (myIdentifier) => {
    if (document.getElementById(myIdentifier) !== null)
      document.getElementById(myIdentifier).remove();
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (localStorage.getItem("token") == null) {
        document.location.href = "/";
      }
      setToken(localStorage.getItem("token"));
      await httpClient
        .get("user", { headers: { token: localStorage.getItem("token") } })
        .then((res) => {
          setUserType(res.data.type === "1" ? "Get Referral" : "Refer");
          setIsLoading(false);
        })
        .catch((err) => {
          alert("Something went wrong!");
          setIsLoading(false);
        });
      await httpClient
        .get("feed", { headers: { token: localStorage.getItem("token") } })
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
      <NavBar />
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          You've got a match! Go to Matches to see your matches.
        </Alert>
      </Snackbar>
      <div className="overflow" key={matches}>
        <Grid
          key={matches}
          container
          alignItems="center"
          justify="center"
          direction="column"
          spacing={2}
          sx={{ mb: 5, mt: 2 }}
        >
          {matches.map((match) => (
            <div className="abs" id={match.email}>
              <div>
                <TinderCard
                  key={match.email}
                  onSwipe={(dir) => {
                    onSwipe(dir, match.id);
                  }}
                  onCardLeftScreen={() => onCardLeftScreen(match.email)}
                  preventSwipe={["down", "up"]}
                >
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    Swipe Left or Right
                  </Typography>
                  <Match data={match} userType={userType} />
                </TinderCard>
              </div>
            </div>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Home;
