import Link from "next/link";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { deleteEvent } from "utils/api";

const EditButtons = ({ id }) => {
  const onDelete = () => {
    deleteEvent(id); // TODO: give response
  };

  return (
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
  );
};

export default EditButtons;
