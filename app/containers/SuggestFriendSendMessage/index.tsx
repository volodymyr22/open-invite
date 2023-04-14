import React, {useState} from 'react';
import {Keyboard, ActivityIndicator} from 'react-native';
import {has} from 'lodash';
import {Page, MessageBox, ProfileContainer} from './styles';
import {Text, Button, Seperator, Avatar} from '@component/shared/stateless';
import Api from '@api';
import {useSelector} from 'react-redux';
import {IRootState} from '@app/features/reducers';
import showSnackBar from '@component/notifications/snackbar';

const Screen: React.FunctionComponent<any> = (props) => {
  const {route} = props;
  const [message, setMessage] = useState('');
  const [suggesting, setSuggesting] = useState<boolean>(false);
  const user = useSelector((state: IRootState) => state.authReducer.user);
  const suggestionProfile = route.params.suggestionProfile;

  if (!has(route, 'params.suggestProfiles') || !has(route, 'params.receiver')) {
    props.navigation.goBack();
  }

  const suggestProfiles = () => {
    Keyboard.dismiss();
    setSuggesting(true);
    if (Array.isArray(route.params.suggestProfiles)) {
      const _list = route.params.suggestProfiles.join(',');
      const _requestBody = {
        message: message,
        receiver_user_id: route.params.receiver,
        sender_user_id: user.id,
        sender_user_name: user.name,
        suggested_user_ids: _list,
      };
      Api.post('users/sendFriendSuggestion', _requestBody)
        .then((res: any) => {
          setSuggesting(false);
          if (!res.ok) {
            showSnackBar(res.data.message);
          } else {
            showSnackBar('Users suggested successfully');
            setMessage('');
            props.navigation.pop(2);
          }
        })
        .catch((ex) => {
          const msg = ex.message || 'Unexpected error. Try again later!';
          showSnackBar(msg, true);
          setSuggesting(false);
        });
    } else {
      setSuggesting(false);
    }
  };

  return (
    <Page>
      <Text weight="semibold">Send a message along with the request</Text>
      <MessageBox value={message} onChangeText={setMessage} />
      {suggestionProfile ? (
        <ProfileContainer>
          <Avatar imageUrl={suggestionProfile.profile_picture} />
          <Text left={15} weight="semibold" numberOfLines={2}>
            {suggestionProfile.name}
          </Text>
        </ProfileContainer>
      ) : null}
      <Seperator height={25} />
      {suggesting ? (
        <ActivityIndicator />
      ) : (
        <Button text="Suggest Profile" onPress={suggestProfiles} />
      )}
    </Page>
  );
};

export default Screen;
