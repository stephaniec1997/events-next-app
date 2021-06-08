import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import GoogleLocationAutocomplete from "components/form/fields/google-autocomplete";

const Location = ({ values, setValues }) => {
  const handleSwitchChange = prop => (event) => {
    setValues({ ...values, [prop]: event.target.checked, place: "" });
  };

  const handleChange = prop => (value) => {
    if (value?.target) value = value.target.value;
    setValues({ ...values, [prop]: value });
  };
  return (
    <>
      {values.virtual ? (
        <TextField
          label="Location"
          value={values.place}
          onChange={handleChange("place")}
        />
      ) : (
        <GoogleLocationAutocomplete
          value={values.place}
          setValue={handleChange("place")}
        />
      )}
      <FormControlLabel
        control={
          <Switch
            checked={values.virtual}
            onChange={handleSwitchChange("virtual")}
            name="virtual"
            color="primary"
          />
        }
        label="Virtual Event"
      />
    </>
  );
};

export default Location;
