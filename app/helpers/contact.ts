import {PermissionsAndroid} from 'react-native';
import Contacts, {Contact} from 'react-native-contacts';

const getContactList = (): Promise<Contact[]> =>
  new Promise((resolve, reject) => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Accept',
    }).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err) {
          reject(err);
        }
        resolve(contacts);
      });
    });
  });

export default getContactList;
