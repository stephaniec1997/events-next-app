import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import EventTitle from "components/events/event-title";
import EventLocation from "components/events/event-location";
import SubscriptionButton from "components/events/subscription-button";
import EditButtons from "components/events/edit-buttons";

const Event = ({
  event,
  edit,
  disableLocation,
  disableSubButton,
  ...props
}) => {
  const buttonProps = edit ? {} : props;

  return (
    <ListItem alignItems="flex-start" {...buttonProps}>
      <ListItemAvatar>
        <Avatar>{event.name.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={<EventTitle title={event.name} date={event.date} />}
        secondary={
          <>
            <EventLocation
              location={event.place}
              virtual={event.virtual}
              disableLocation={disableLocation}
            />
            <Typography variant="body1">{event.description}</Typography>
          </>
        }
      />
      {!edit && !disableSubButton && (
        <SubscriptionButton
          event={event}
        />
      )}
      {edit && <EditButtons id={event.id} />}
    </ListItem>
  );
};

export default Event;
