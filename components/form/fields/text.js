import TextField from "@material-ui/core/TextField";

const Text = ({ title, label, value, onChange, className, ...props }) => {
  return (
    <TextField
      className={className}
      id={`${title}-${label}`}
      label={label}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Text;
