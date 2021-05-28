import { useState } from "react";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import Form from "components/form";
import FormError from "components/form/error";

import { useAuthenticationContext } from "contexts/authentication";

import { validateForm } from "utils";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(2),
    justifyContent: "center",
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const router = useRouter();
  const [error, setError] = useState(null);

  const auth = useAuthenticationContext();

  const handleSubmit = async (data, signin) => {
    const formErrors = validateForm(data);
    if (formErrors) {
      return setError(formErrors);
    }
    const res = await signin();
    if (res?.message) return setError(res.message);
    router.push("/");
  };

  const createUser = async (data) => {
    handleSubmit(data, () => {
      return auth.signup(data.email, data.password);
    });
  };

  const login = async (data) => {
    handleSubmit(data, () => {
      return auth.signin(data.email, data.password);
    });
  };

  return (
    <Container className={classes.root}>
      <FormError error={error} setOpen={setError} />
      <Form
        title={"Sign Up"}
        fields={[
          { label: "email", type: "text" },
          { label: "password", type: "password" },
        ]}
        buttonTitle={"Create Account"}
        onSubmit={createUser}
      />
      <Form
        title={"Log In"}
        fields={[
          { label: "email", type: "text" },
          { label: "password", type: "password" },
        ]}
        buttonTitle={"Log In"}
        onSubmit={login}
      />
    </Container>
  );
};

export default SignIn;
