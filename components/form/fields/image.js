import { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const ImageField = ({ values, setValues, className }) => {
  const [image, setImage] = useState(values.url);

  const updateImage = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setValues({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const removeImage = () => {
    setImage("");
    setValues({ file: null, url: "" });
  };

  return (
    <>
      <input
        accept="image/jpg, image/jpeg, image/png"
        type="file"
        id="icon-button-file"
        style={{ display: "none" }}
        onChange={updateImage}
      />
      <label htmlFor="icon-button-file" className={className}>
        <Tooltip title={values.url ? "Edit" : "Add"} placement="top">
          <IconButton
            variant="contained"
            component="span"
            size="medium"
            color="primary"
          >
            <Avatar src={image} />
          </IconButton>
        </Tooltip>
      </label>
      <Button
        variant="contained"
        color="primary"
        onClick={removeImage}
        disabled={!image}
      >
        Remove Image
      </Button>
    </>
  );
};

export default ImageField;
