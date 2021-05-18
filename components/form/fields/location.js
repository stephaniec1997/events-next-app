import {
  useState,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import LocationOption from 'components/form/fields/location-option';

import throttle from 'lodash/throttle';

import { GOOGLE_API_KEY } from 'constants';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const GoogleMapsLocation = ({ value, setValue }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }


  // https://stackoverflow.com/questions/64203690/why-is-usememo-used-in-the-material-ui-documentation-for-the-autocomplete
  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        const results = autocompleteService.current.getPlacePredictions(request, callback);
        if (!results) callback([]);
      }, 200),
    [],
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }

    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
}, [value, inputValue, fetch]);

  return (
    <Autocomplete
      freeSolo
      value={value}
      renderInput={params => (
        <TextField {...params} label="Location" />
      )}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        setValue(newInputValue);
      }}
      options={options}
      getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      renderOption={option => (<LocationOption option={option} />)}
    />
  );
};

export default GoogleMapsLocation;
