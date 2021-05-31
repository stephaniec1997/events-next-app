import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import EventTitle from "components/events/event-title";
import EditButtons from "components/events/edit-buttons";

const Event = ({ event, edit, ...props }) => {
  const buttonProps = edit ? {} : props;

  return (
    <ListItem alignItems="flex-start" {...buttonProps}>
      <ListItemAvatar>
        <Avatar>{event.name.charAt(0)}</Avatar>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <EventTitle
            title={event.name}
            date={`${event.startDate}${event.endDate && ` - ${event.endDate}`}`}
          />
        }
        secondary={
          <>
            <Typography variant="body2">{event.place}</Typography>
            <Typography variant="body1">{event.description}</Typography>
          </>
        }
      />
      {edit && <EditButtons id={event.id} />}
    </ListItem>
  );
};

export default Event;
