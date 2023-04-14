import {Share, Alert} from 'react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {User} from '@app/types';

const buildLink = async (userId) => {
  const link = await dynamicLinks().buildLink({
    link: `http://studiodiseno.com?userId=${userId}`,
    domainUriPrefix: 'https://openinvite.page.link',
  });

  return link;
};

const shareMyLink = async (user: User): Promise<any> => {
  try {
    const link = await buildLink(user.id);
    const msg = `Hey there! ${user.name} is using oInvite and has invited you to join:`;

    const result = await Share.share({
      message: `${msg} ${link}`,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('shared with activity type of result.activityType');
      } else {
        console.log('shared');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('dismissed');
    }
  } catch (error) {
    Alert.alert('', error.message);
  }
};

export default shareMyLink;
