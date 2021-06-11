import { useState } from "react";
// import { useRouter } from "next/router";

import Form from "components/form";
import FormError from "components/form/error";
import FormSuccess from "components/form/success";

import { validateForm } from "utils";
import { updateUser } from "utils/firebase";

const ProfileEdit = ({ displayName, userAvatar }) => {
  // const router = useRouter();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [disableNameSubmit, setDisableNameSubmit] = useState(null);
  const [disableAvatarSubmit, setDisableAvatarSubmit] = useState(null);

  const updateDisplayName = (updatedData) => {
    setDisableNameSubmit(true);

    const formErrors = validateForm(updatedData);

    if (formErrors) {
      setError(formErrors);
      setDisableNameSubmit(false);
      return;
    }

    updateUser({ displayName: updatedData.name })
      .then(() => {
        setDisableNameSubmit(false);
        // TODO: Make sure to re-ertrieve data OR set displayName
      })
      .catch((err) => {
        console.log("err:", err);
        setError(err);
        setDisableNameSubmit(false);
      });
  };

  const updateAvatar = ({ image }) => {
    setDisableAvatarSubmit(true);

    if (userAvatar) {
      // TODO: remove from db
    }
    if (image.file) {
      // TODO: add to db and then user
    } else {
      setDisableAvatarSubmit(false);
    }
  };

  return (
    <>
      <FormSuccess message={successMessage} setOpen={setSuccessMessage} />
      <FormError error={error} setOpen={setError} />
      <Form
        title="User Image"
        fields={[{ label: "image", type: "image", value: { url: userAvatar } }]}
        buttonTitle={"Save Changes"}
        onSubmit={updateAvatar}
        disableSubmit={disableAvatarSubmit}
      />
      <Form
        title="Display Name"
        fields={[{ label: "name", type: "text", value: displayName }]}
        buttonTitle={"Update Display Name"}
        onSubmit={updateDisplayName}
        disableSubmit={disableNameSubmit}
      />
    </>
  );
};

export default ProfileEdit;
