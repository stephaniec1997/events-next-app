import { useState } from "react";
import Link from "next/link";
import nookies from "nookies";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

import Events from "components/events";
import Form from "components/form";
import FormError from "components/form/error";
import FormSuccess from "components/form/success";

import { validateForm } from "utils";
import { verifyAdmin, getEvents } from "utils/firebase/admin";
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
  adminChanges: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
}));

const Admin = ({ events, message, err }) => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const removeAdmin = (data) => {
    setError(null);
    const formErrors = validateForm(data);
    if (formErrors) {
      return setError(formErrors);
    }
    removeAdminByEmail(data.email)
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setSuccessMessage(response.message);
        }
      })
      .finally(() => {
        // TODO: clear field
      });
  };

  const addAdmin = (data) => {
    setError(null);
    const formErrors = validateForm(data);
    if (formErrors) {
      return setError(formErrors);
    }
    addAdminByEmail(data.email)
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setSuccessMessage(response.message);
        }
      })
      .finally(() => {
        // TODO: clear field
      });
  };

  if (err) return <Typography variant="h4">{err}</Typography>; // TODO: handle this with next error page cmpnt

  return (
    <Container className={classes.root}>
      <Typography>{message}</Typography>
      <FormSuccess message={successMessage} setOpen={setSuccessMessage} />
      <FormError error={error} setOpen={setError} />
      <Container className={classes.adminChanges}>
        <Form
          title="New Admin"
          fields={[{ label: "email", type: "text" }]}
          buttonTitle="Add New Admin"
          onSubmit={addAdmin}
        />
        <Form
          title="Remove Admin"
          fields={[{ label: "email", type: "text" }]}
          buttonTitle="Remove Admin"
          onSubmit={removeAdmin}
        />
      </Container>
      <Divider variant="fullWidth" light />
      <Link href="/admin/event/create">
        <Button variant="contained" color="primary" className={classes.button}>
          <AddIcon /> New Event
        </Button>
      </Link>
      <Events data={events} edit />
    </Container>
  );
};

export const getServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    const isUserAdmin = await verifyAdmin(cookies.token);

    if (isUserAdmin) {
      const data = await getEvents();
      return {
        props: {
          events: data,
          message: `FINALLYYYYYYYYY.`,
        },
      };
    }

    return {
      props: { err: "Error 403: Unauthorized" },
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
