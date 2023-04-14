import {Alert} from 'react-native';
import authTypes from '@feature/auth/constants';

export const logoutFromFacebook = (dispatch: any) => {
  Alert.alert(
    '',
    'Going back will Log you out. Do you want to continue?',
    [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => dispatch({type: authTypes.REQUEST_LOGOUT}),
      },
    ],
    {cancelable: true},
  );
};
