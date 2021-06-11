import { useState } from "react";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Button from "@material-ui/core/Button";

import ErrorMessage from "components/form/error";
import SuccessMessage from "components/form/success";

import { useAuthenticationContext } from "contexts/authentication";

import { subscribeToEvent, unsubscribeFromEvent } from "utils/firebase";

const SubscriptionButton = ({ isSubscribed, eid }) => {
  const auth = useAuthenticationContext();

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleClick = () => {
    if (isSubscribed) {
      return unsubscribeFromEvent(auth.user.uid, eid)
        .then(() => {
          successMessage("You are now UNSUBSCRIBED from this event");
          // TODO:update data on the fron end page
        })
        .catch((err) => {
          setError(err);
        });
    }

    return subscribeToEvent(auth.user.uid, eid)
      .then(() => {
        successMessage("You are now SUBSCRIBED from this event");
        // TODO:update data on the fron end page
      })
      .catch((err) => {
        setError(err);
      });
  };

  if (!auth.user) {
    return null;
  }

  return (
    <>
      <SuccessMessage message={successMessage} setOpen={setSuccessMessage} />
      <ErrorMessage error={error} setOpen={setError} />
      <ListItemSecondaryAction>
        <Button
          color="secondary"
          edge="end"
          aria-label={isSubscribed ? "unsubscribe-button" : "subscribe-button"}
          onClick={handleClick}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
      </ListItemSecondaryAction>
    </>
  );
};

export default SubscriptionButton;
