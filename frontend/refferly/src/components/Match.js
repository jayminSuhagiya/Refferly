import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Match = (props) => {
  useEffect(() => {
    console.log(props);
  });
  const fields = ["name", "affiliation", "title", "email", "phone", "about"];
  return (
    <Card variant="outlined" sx={{ width: "80vw", mt: 0.5, mb: 0.5 }}>
      <CardContent>
        {fields.map((field) => (
          <>
            <Typography sx={{ mt: 0.5 }}>
              {capitalizeFirstLetter(field)}:{"  " + props.data[field]}
            </Typography>
          </>
        ))}
      </CardContent>
      <CardActions>
        {props.data.linkedin != undefined &&
        props.data.linkedin != null &&
        props.data.linkedin != "" ? (
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              window.open(props.data.linkedin, "_blank");
            }}
          >
            Linkedin
          </Button>
        ) : (
          <></>
        )}
        {props.data.resume != undefined &&
        props.data.resume != null &&
        props.data.resume != "" ? (
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              window.open(props.data.resume, "_blank", "noopener,noreferrer");
            }}
          >
            Resume
          </Button>
        ) : (
          <></>
        )}
        {props.data.portfolio != undefined &&
        props.data.portfolio != null &&
        props.data.portfolio != "" ? (
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              window.open(props.data.portfolio, "_blank");
            }}
          >
            Portfolio
          </Button>
        ) : (
          <></>
        )}
      </CardActions>
    </Card>
  );
};

export default Match;
