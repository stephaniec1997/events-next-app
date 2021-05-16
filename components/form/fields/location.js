import {
  useState,
  // useRef,
  // useMemo,
  // useEffect
} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


import LocationOption from 'components/form/fields/location-option';

// import throttle from 'lodash/throttle';

// function loadScript(src, position, id) {
//   if (!position) {
//     return;
//   }
//
//   const script = document.createElement('script');
//   script.setAttribute('async', '');
//   script.setAttribute('id', id);
//   script.src = src;
//   position.appendChild(script);
// }

// const autocompleteService = { current: null };

const OPTIONS = [
  'option1',
  'option2',
  'option3',
  {
    description: 'Pretty cool text description',
    'structured_formatting': {
      'main_text': 'Pretty cool text',
      'main_text_matched_substrings': [{offset: 2, length: 3}, {offset: 12, length: 3}],
      'secondary_text': 'Honestly, nothing but truth',
    },
  },
];



const GoogleMapsLocation = ({value, setValue}) => {
  // const [inputValue, setInputValue] = useState('');
  // const [options, setOptions] = useState(OPTIONS);
  // const loaded = useRef(false);

  // if (typeof window !== 'undefined' && !loaded.current) {
  //   if (!document.querySelector('#google-maps')) {
  //     loadScript(
  //       'https://maps.googleapis.com/maps/api/js?key={API_KEY}&libraries=places',
  //       document.querySelector('head'),
  //       'google-maps',
  //     );
  //   }
  //
  //   loaded.current = true;
  // }

  // const fetch = useMemo(
  //   () =>
  //     throttle((request, callback) => {
  //       autocompleteService.current.getPlacePredictions(request, callback);
  //     }, 200),
  //   [],
  // );

  // useEffect(() => {
  //   let active = true;
  //
  //   if (!autocompleteService.current && window.google) {
  //     autocompleteService.current = new window.google.maps.places.AutocompleteService();
  //   }
  //   if (!autocompleteService.current) {
  //     return undefined;
  //   }
  //
  //   if (inputValue === '') {
  //     setOptions(value ? [value] : []);
  //     return undefined;
  //   }
  //
  //   fetch({ input: inputValue }, (results) => {
  //     if (active) {
  //       let newOptions = [];
  //
  //       if (value) {
  //         newOptions = [value];
  //       }
  //
  //       if (results) {
  //         newOptions = [...newOptions, ...results];
  //       }
  //
  //       setOptions(newOptions);
  //     }
  //   });
  //
  //   return () => {
  //     active = false;
  //   };
  // }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      freeSolo
      value={value}
      renderInput={params => (
        <TextField {...params} label="Location" />
      )}
      onInputChange={(event, newInputValue) => {
        setValue(newInputValue);
      }}
      options={OPTIONS}
      getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
      // onChange={(event, newValue) => {
      //   setOptions(newValue ? [newValue, ...options] : options);
      //   setValue(newValue);
      // }}
      renderOption={option => (<LocationOption option={option} />)}
    />
  );
};

export default GoogleMapsLocation;
