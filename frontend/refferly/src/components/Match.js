import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Match = (props) => {
  useEffect(() => {
    console.log(props);
  });
  const fields = [
    "email",
    "phone",
    "linkedin",
    "resume",
    "portfolio",
    "type",
    "positions",
    "about",
    "title",
    "affiliation",
  ];
  return (
    <Card variant="outlined" sx={{ width: "80vw", mt: 0.5, mb: 0.5 }}>
      <CardContent>
        {fields.map((field) => (
          <>
            <Typography sx={{ mt: 0.5 }}>
              {field}:{props.data[field]}
            </Typography>
          </>
        ))}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

/*
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
*/
export default Match;
