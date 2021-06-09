import Link from "next/link";
import Typography from "@material-ui/core/Typography";

const EventLocation = ({ location, virtual, disableLocation }) => {
  return (
    <>
      {(!virtual || disableLocation) && (
        <Typography variant="body2">{location}</Typography>
      )}
      {virtual && !disableLocation && (
        <Link href={location} passHref>
          <Typography component="a" variant="body2">
            {location}
          </Typography>
        </Link>
      )}
    </>
  );
};

export default EventLocation;
