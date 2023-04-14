import Snackbar from 'react-native-snackbar';
import {Colors} from '@app/themes';

const showSnackBar = (message: string, hasError = false) => {
  let errorProps = {};

  if (hasError) {
    errorProps = {
      backgroundColor: Colors.error,
      textColor: Colors.onError,
    };
  }

  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    ...errorProps,
  });
};

export default showSnackBar;
