import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import ErrorMessage from "components/form/error";
import SuccessMessage from "components/form/success";

import { deleteEvent } from "utils/api";

const EditButtons = ({ id }) => {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const onDelete = () => {
    deleteEvent(id)
      .then(res => res.json())
      .then((response) => {
        if (response.error) {
          setError(response.error);
        } else {
          setSuccessMessage(response.message);
        }
      })
      .finally(() =>
        setTimeout(() => {
          router.replace(router.asPath);
        }, 500),
      );
  };

  return (
    <>
      <SuccessMessage message={successMessage} setOpen={setSuccessMessage} />
      <ErrorMessage error={error} setOpen={setError} />
      <ListItemSecondaryAction>
        <Link href={`/admin/event/${id}`} passHref>
          <IconButton edge="end" aria-label="delete">
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton edge="end" aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </>
  );
};

export default EditButtons;
