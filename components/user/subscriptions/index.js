import { Fragment, useContext } from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import Event from "components/user/subscriptions/event";

import UserProfileContext from "contexts/user-profile";

const Subscriptions = () => {
  const user = useContext(UserProfileContext);

  return (
    <List>
      {user.subscriptions.eventsList.map(event => (
        <Fragment key={event.id}>
          <Event event={event} />
          <Divider
            key={`event-${event.id}-divider`}
            variant="inset"
            component="li"
          />
        </Fragment>
      ))}
    </List>
  );
};

export default Subscriptions;
