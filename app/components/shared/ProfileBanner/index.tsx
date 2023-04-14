import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '@app/themes';
import {s} from 'react-native-size-matters';
import {
  Avatar,
  Text,
  Button,
  Icon,
  Seperator,
  Spacer,
} from '@component/shared/stateless';

import styles, {
  Container,
  Row,
  LocationContainer,
  CurrentUserActions,
  ViewersActions,
  JoinInvite,
  SuggestFriend,
  MoreActions,
  JoinInviteText,
  SuggestFriendText,
} from './styles';

import {Props} from './types';
import {useNavigation} from '@react-navigation/native';

const ProfileBanner: React.FunctionComponent<Props> = (props) => {
  const {
    id,
    imageUrl,
    fullName,
    status,
    location,
    isFriend,
    availability,
    hasEvent,
    onJoinEvent,
    isProfilePage = false,
    events,
    transparent,
  } = props;

  let _location = location;

  if (Array.isArray(events)) {
    if (events.length >= 1) {
      _location = events[0].location.place;
    }
  }

  const navigation = useNavigation();

  const getStatusText = () => {
    if (status === 'Offline') {
      return 'Not Available';
    }
    return status ? status.replace('_', ' ') : status;
  };

  return (
    <Container transparent={transparent}>
      <Avatar availability={status} size="lg" imageUrl={imageUrl} />
      <Seperator height={10} />
      <Row>
        <Text weight="bold" size={14} color={Colors.onPrimary}>
          {fullName}
        </Text>
      </Row>
      <Seperator height={5} />
      <Text size={14} color={Colors.onPrimary}>
        {getStatusText()}
      </Text>
      <Seperator height={5} />
      <Row>
        {_location ? (
          <>
            <LocationContainer>
              <Icon name="map" color={Colors.onPrimary} size={s(15)} />
              <Text
                size={14}
                left={5}
                color={Colors.onPrimary}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.locationText}>
                {_location}
              </Text>
            </LocationContainer>
          </>
        ) : null}
      </Row>
      {availability ? (
        <View style={styles.hyperlink}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigation.navigate('MyEvents')}>
            <Seperator height={5} />
            <Text size={14} color={Colors.onPrimary}>
              {availability}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <Seperator height={10} />
      {!isFriend ? (
        <CurrentUserActions>
          {isProfilePage ? (
            <>
              <Button
                text="Edit Profile"
                iconName="pencil"
                onPress={() => navigation.navigate('EditProfileModal')}
                preset="secondary"
                size="sm"
              />
              <Spacer width={25} />
            </>
          ) : null}
          <Button
            text={isProfilePage ? 'My Status' : 'Edit Status'}
            iconName={isProfilePage ? '' : 'pencil'}
            onPress={() => navigation.navigate('EditStatus')}
            fillType="outlined"
            preset="secondary"
            size="sm"
          />
        </CurrentUserActions>
      ) : (
        <ViewersActions>
          {hasEvent ? (
            <JoinInvite onPress={onJoinEvent}>
              <JoinInviteText>Join Invite</JoinInviteText>
            </JoinInvite>
          ) : null}

          <SuggestFriend
            onPress={() => navigation.navigate('SuggestFriendsList', {id})}>
            <SuggestFriendText>Suggest A Friend</SuggestFriendText>
          </SuggestFriend>
          <MoreActions
            onPress={() => navigation.navigate('FriendsProfileSettings', {id})}>
            <Icon
              name="arrow-down-s-fill"
              size={s(15)}
              color={Colors.onPrimary}
            />
          </MoreActions>
        </ViewersActions>
      )}
    </Container>
  );
};

export default ProfileBanner;
