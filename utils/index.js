import {capitalize,toLower, trim} from 'lodash';

export const validateEmail = (email) =>  {
  email = trim(toLower(email));
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validateForm =(data) => {
  let error;
  Object.entries(data).forEach(([key, value]) => {
    if(!value || value==='') {
      error = (`${capitalize(key)} cannot be empty.`);
      return;
    }
    if(key === 'email'){
      const isValidEmail = validateEmail(value);
      if(!isValidEmail){
        error = 'Email is not valid';
        return;
      }
    }
  });
  return error;
};
