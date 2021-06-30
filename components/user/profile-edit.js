import { useState, useContext } from "react";
import Compress from "react-image-file-resizer";

import Form from "components/form";
import FormError from "components/form/error";
import FormSuccess from "components/form/success";

import UserProfileContext from "contexts/user-profile";

import { validateForm } from "utils";
import { updateUser } from "utils/firebase";
import { storePhoto, deletePhoto } from "utils/firebase/image-storage";

const ProfileEdit = () => {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [disableNameSubmit, setDisableNameSubmit] = useState(null);
  const [disableAvatarSubmit, setDisableAvatarSubmit] = useState(null);

  const user = useContext(UserProfileContext);

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
        user.displayName = updatedData.name;
      })
      .catch(catchError);
  };

  const updateAvatar = ({ image }) => {
    setDisableAvatarSubmit(true);
    if (user.avatarUrl && !image.file) {
      return deletePhoto(user.id).then(() => {
        updateUserPhoto("");
      });
    }
    if (image.file) {
      // Compressing file before uploading
      Compress.imageFileResizer(
        image.file, // file
        300, // max width
        300, // max height
        "JPEG", // compress format
        70, // quality
        0, // rotation
        (uri) => {
          storePhoto(user.id, uri)
            .then((url) => {
              updateUserPhoto(url);
            })
            .catch(catchError);
        }, //  callBack function of the resized new image URI
        "blob", // output type
      );
    }
  };

  const updateUserPhoto = (url) => {
    updateUser({ photoURL: url })
      .then(() => {
        setSuccessMessage("Your avatar has been Updated!");
        setDisableAvatarSubmit(false);
        user.avatarUrl = url;
      })
      .catch(catchError);
  };

  const catchError = (err) => {
    setError(err || err.message);
    setDisableAvatarSubmit(false);
  };

  return (
    <>
      <FormSuccess message={successMessage} setOpen={setSuccessMessage} />
      <FormError error={error} setOpen={setError} />
      <Form
        title="User Image"
        fields={[
          { label: "image", type: "image", value: { url: user.avatarUrl } },
        ]}
        buttonTitle={"Save Changes"}
        onSubmit={updateAvatar}
        disableSubmit={disableAvatarSubmit}
      />
      <Form
        title="Display Name"
        fields={[{ label: "name", type: "text", value: user.displayName }]}
        buttonTitle={"Update Display Name"}
        onSubmit={updateDisplayName}
        disableSubmit={disableNameSubmit}
      />
    </>
  );
};

export default ProfileEdit;
