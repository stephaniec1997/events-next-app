import { useState } from "react";
// import { useRouter } from "next/router";

import Form from "components/form";
import FormError from "components/form/error";
import FormSuccess from "components/form/success";

import { validateForm } from "utils";
import { updateUser } from "utils/firebase";
import { storePhoto, deletePhoto } from "utils/firebase/image-storage";

const ProfileEdit = ({ displayName, userAvatar, uid }) => {
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
        setSuccessMessage("Display Name has been Updated!");
        // TODO: Make sure to re-ertrieve data OR set displayName
      })
      .catch(catchError);
  };

  const updateAvatar = ({ image }) => {
    setDisableAvatarSubmit(true);
    if (userAvatar && !image.file) {
      return deletePhoto(uid).then(() => {
        updateUserPhoto("");
      });
    }
    if (image.file) {
      // TODO: compress file since only used for avatar
      storePhoto(uid, image.file)
        .then((url) => {
          updateUserPhoto(url);
        })
        .catch(catchError);
    }
  };

  const updateUserPhoto = (url) => {
    updateUser({ photoURL: url })
      .then(() => {
        setSuccessMessage("Your avatar has been Updated!");
        setDisableAvatarSubmit(false);
        // TODO: Make sure to re-ertrieve data OR set avatar
      })
      .catch(catchError);
  };

  const catchError = (err) => {
    // console.log("err:", err);
    setError(err);
    setDisableAvatarSubmit(false);
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
