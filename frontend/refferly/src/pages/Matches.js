import { Grid, Button, Typography } from "@mui/material";
import Match from "../components/Match";
import NavBar from "../components/NavBar";

const Matches = () => {
  const matches = [
    {
      email: "1@g.com",
      phone: "2323",
      linkedin: "abc",
      resume: "res",
      portfolio: "123",
      type: "Get Referral",
      positions: ["Entry Level"],
      about: "asd",
      title: "ads",
      affiliation: "asd",
    },
    {
      email: "2@g.com",
      phone: "2sad323",
      linkedin: "aasdbc",
      resume: "resasd",
      portfolio: "123asd",
      type: "Get Referral",
      positions: ["Entry Level"],
      about: "asdasd",
      title: "adsas",
      affiliation: "asdasd",
    },
    {},
    {},
    {},
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
