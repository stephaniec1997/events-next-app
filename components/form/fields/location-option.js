import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LocationOptionModel from 'models/location-option';

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

const LocationOption = ({ option }) => {
  const classes = useStyles();

  const location = new LocationOptionModel(option);

  return (
    <Grid container alignItems="center">
      <Grid item>
        <LocationOnIcon className={classes.icon} />
      </Grid>
      <Grid item xs>
        {location.mainText ? location.mainTextParts.map((part, index) => (
          <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
            {part.text}
          </span>
        )):
        location.description
        }
        <Typography variant="body2" color="textSecondary">
          {location.secondaryText}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LocationOption;
