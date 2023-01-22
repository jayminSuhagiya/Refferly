import { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Typography,
  Snackbar,
  Alert,
  useStepContext,
} from "@mui/material";
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
  const [vis, setVis] = useState({});
  const [queue, setQueue] = useState(new Set());
  const MINUTE_MS = 2000;

  useEffect(() => {
    const interval = setInterval(() => {
      clearQueue();
    }, MINUTE_MS);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const onSwipe = (direction, id) => {
    let q2 = queue;
    q2.add([direction, id]);
    setQueue(q2);
  };
  const onCardLeftScreen = (direction, divid, id) => {
    if (document.getElementById(divid) !== null)
      document.getElementById(divid).style.visibility = "hidden";
  };

  async function clearQueue() {
    let prev = ["noo", -1];
    for (const x of Array.from(queue)) {
      if (vis[x]) continue;
      let v2 = vis;
      v2[x] = true;
      setVis(v2);
      if (x[0] == prev[0] && x[1] == prev[1]) continue;
      prev = x;
      await httpClient
        .post(
          "swipe",
          { swipe_on: x[1], type: x[0] === "left" ? 0 : 1 },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then((res) => {
          if (res.data.matched) setState({ ...state, open: true });
        })
        .catch((err) => {
          alert("Something went wrong!");
        });
    }
  }

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
      <div className="overflow">
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          spacing={2}
          sx={{ mb: 5, mt: 2 }}
        >
          {matches.map((match) => (
            <div key={match} className="abs" id={match.email}>
              <div>
                <TinderCard
                  onSwipe={(dir) => {
                    onSwipe(dir, match.id);
                  }}
                  onCardLeftScreen={(dir) => {
                    onCardLeftScreen(dir, match.email, match.id);
                  }}
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
