import TextField from '@material-ui/core/TextField';

const Text = ({ label, value, onChange, className, ...props }) => {
  return (
    <TextField
      className={className}
      id={label}
      label={label}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default Text;
