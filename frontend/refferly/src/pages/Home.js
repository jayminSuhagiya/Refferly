import { useState } from "react";
import { Grid, Button, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import TinderCard from "react-tinder-card";
import Match from "../components/Match";
const Home = () => {
  let matches = [
    {
      name: "Eren",
      email: "eren@google.com",
      phone: "438 692 1420",
      linkedin: "https://www.linkedin.com/in/deep-raval/",
      resume:
        "https://github.com/3DJakob/react-native-tinder-card-demo/blob/master/src/examples/Simple.js",
      portfolio: "",
      type: "Get Referral",
      positions: ["Entry Level"],
      about: "Devil of paradis",
      title: "Software Engineer L3",
      affiliation: "Google",
    },
    {
      name: "Sasuke",
      email: "uchihanumberone@meta.com",
      phone: "321 345 3123",
      linkedin: "https://www.linkedin.com/in/deep-raval/",
      resume: "resasd",
      portfolio: "123asd",
      type: "Get Referral",
      positions: ["Entry Level"],
      about: "Last surviving uchiha!",
      title: "Engineering Manager",
      affiliation: "Meta",
    },
  ];
  // const [match, setMatch] = useState(matches[0]);
  let index = 0;
  let lastId = null;
  const onSwipe = (direction) => {
    // console.log("bef ", matches, index);
    console.log("You swiped: " + direction);
    // index++;
    // console.log("aft ", matches, index);
    // if (index < matches.length) setMatch(matches[0]);
    // else setMatch(null);
  };
  const onCardLeftScreen = (myIdentifier) => {
    document.getElementById(myIdentifier).remove();
    console.log(myIdentifier + " left the screen");
  };

  return (
    <>
      <NavBar />
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
          {/* {match !== null ? (
            <div key={match}>
              <div key={match}>
                <TinderCard
                  key={match.email}
                  onSwipe={onSwipe}
                  onCardLeftScreen={() => onCardLeftScreen("fooBar")}
                  preventSwipe={["down", "up"]}
                >
                  <Match data={match} />
                </TinderCard>
              </div>
            </div>
          ) : (
            <></>
          )} */}
          {matches.map((match) => (
            <div className="abs" id={match.email}>
              <div>
                <TinderCard
                  key={match.email}
                  onSwipe={onSwipe}
                  onCardLeftScreen={() => onCardLeftScreen(match.email)}
                  preventSwipe={["down", "up"]}
                >
                  <Match data={match} />
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
