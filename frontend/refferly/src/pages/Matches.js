import { Grid, Button, Typography } from "@mui/material";
import Match from "../components/Match";
import NavBar from "../components/NavBar";

const Matches = () => {
  const matches = [
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

  return (
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
  );
};

export default Matches;
