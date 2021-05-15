import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const EditButtons = () => {

  return (
    <ListItemSecondaryAction>
      {/* TODO: ADD FUNCTIONALITY*/}
      <IconButton edge="end" aria-label="delete">
        <EditIcon />
      </IconButton>
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </ListItemSecondaryAction>

  );
};

export default EditButtons;
