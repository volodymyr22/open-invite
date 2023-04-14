import messaging from '@react-native-firebase/messaging';

const registerAppWithFCM = async () => {
  await messaging().registerDeviceForRemoteMessages();
};

const requestUserPermission = async () => {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    console.log('User has notification permissions enabled.');
    registerAppWithFCM();
  } else if (
    authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
  ) {
    console.log('User has provisional notification permissions.');
    registerAppWithFCM();
  } else {
    console.log('---User has notification permissions disabled---');
    throw 'User has notification permissions disabled';
  }
};

export default requestUserPermission;
