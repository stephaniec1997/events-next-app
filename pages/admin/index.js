import { useState } from "react";
import Link from "next/link";
import Error from "next/error";
import nookies from "nookies";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RestoreIcon from "@material-ui/icons/Restore";
import UpdateIcon from "@material-ui/icons/Update";

import Events from "components/events";
import Form from "components/form";
import FormError from "components/form/error";
import FormSuccess from "components/form/success";

import { validateForm } from "utils";
import { verifyAdmin, getEvents, getPastEvents } from "utils/firebase/admin";
import { addAdminByEmail, removeAdminByEmail } from "utils/api";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  eventsToggle: {
    marginTop: theme.spacing(2),
    marginLeft: "80%",
  },
  adminChanges: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

const Admin = ({ events, pastEvents, errorCode }) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isPastEvents, setIsPastEvents] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [disableSubmit, setDisableSubmit] = useState(false);

  const handleSubmit = (data, action) => {
    setDisableSubmit(true);
    setError(null);
    const formErrors = validateForm(data);
    if (formErrors) {
      setDisableSubmit(false);
      return setError(formErrors);
    }

    action(data.email)
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setSuccessMessage(response.message);
        }
      })
      .finally(() => {
        setDisableSubmit(false);
      });
  };

  const removeAdmin = (data) => {
    handleSubmit(data, removeAdminByEmail);
  };

  const addAdmin = (data) => {
    handleSubmit(data, addAdminByEmail);
  };

  if (errorCode) return <Error statusCode={errorCode} />;

  return (
    <Container className={classes.root}>
      <FormSuccess message={successMessage} setOpen={setSuccessMessage} />
      <FormError error={error} setOpen={setError} />
      <Container className={classes.adminChanges}>
        <Form
          title="New Admin"
          fields={[{ label: "email", type: "text" }]}
          buttonTitle="Add New Admin"
          clearOnSubmit
          onSubmit={addAdmin}
          disableSubmit={disableSubmit}
        />
        <Form
          title="Remove Admin"
          fields={[{ label: "email", type: "text" }]}
          buttonTitle="Remove Admin"
          clearOnSubmit
          onSubmit={removeAdmin}
          disableSubmit={disableSubmit}
        />
      </Container>
      <Divider variant="fullWidth" light />
      <Link href="/admin/event/create">
        <Button variant="contained" color="primary" className={classes.button}>
          <AddIcon /> New Event
        </Button>
      </Link>
      <Button
        color="primary"
        className={classes.eventsToggle}
        size="small"
        onClick={() => {
          setIsPastEvents(!isPastEvents);
        }}
      >
        {isPastEvents ? (
          <>
            Upcoming Events <UpdateIcon />
          </>
        ) : (
          <>
            Past Events <RestoreIcon />
          </>
        )}
      </Button>
      <Events data={isPastEvents ? pastEvents : events} edit />
    </Container>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    const isUserAdmin = await verifyAdmin(cookies.token);

    if (isUserAdmin) {
      const data = await getEvents();
      const pastEvents = await getPastEvents();
      return {
        props: {
          events: data,
          pastEvents,
        },
      };
    }

    return {
      props: { errorCode: 403 },
    };
  } catch (err) {
    ctx.res.writeHead(302, { Location: "/signin" });
    ctx.res.end();
    return {
      props: {},
    };
  }
};

export default Admin;
