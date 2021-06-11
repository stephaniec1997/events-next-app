import Link from "next/link";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import EventTitle from "components/events/event-title";
import NotificationIcon from "components/user/subscriptions/notification-icon";

const useStyles = makeStyles(() => ({
  event: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const Event = ({ event }) => {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start" key={`event-${event.id}`} component="li">
      <ListItemText
        disableTypography
        primary={
          <div className={classes.event}>
            <Link href={`/event/${event.id}`}>
              <a>
                <EventTitle title={event.name} date={event.date} />
              </a>
            </Link>
            <NotificationIcon event={event} />
          </div>
        }
      />
    </ListItem>
  );
};

export default Event;
