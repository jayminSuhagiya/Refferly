import { Grid, Button, Typography } from "@mui/material";

const NotFound = () => {
  return (
    <div className="AppS">
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ "text-align": "center" }}>
          <iframe
            src="https://giphy.com/embed/kFgzrTt798d2w"
            width="480"
            height="342"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
