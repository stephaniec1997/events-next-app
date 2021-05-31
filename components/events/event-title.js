import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
  },
  date: {
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(1),
    },
  },
}));

const Event = ({ title, date }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="span" variant="h5" color="textPrimary">
        {title}
      </Typography>
      <Typography
        className={classes.date}
        component="span"
        variant="body2"
        color="textSecondary"
      >
        {date}
      </Typography>
    </div>
  );
};

export default Event;
