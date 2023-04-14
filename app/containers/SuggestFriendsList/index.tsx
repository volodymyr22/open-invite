import React, {useContext, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import {has, reject, find} from 'lodash';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {s} from 'react-native-size-matters';

import {Page, SelectionContainer, ProfileContainer} from './styles';
import {
  Text,
  FriendItem,
  List,
  Icon,
  Button,
} from '@app/components/shared/stateless';
import {Fonts, Colors} from '@app/themes';
import {IRootState} from '@app/features/reducers';
import Context from './context';
import {Friend} from '@app/types';

const Tab = createMaterialTopTabNavigator();

const EmptyFriends = () => (
  <Text center>You have no friends at the moment</Text>
);

const CommonInterestFriends = () => {
  const ctx = useContext(Context);
  const [selected, setSelected] = useState<any>(null);

  const selectProfile = (profile) => {
    setSelected(profile);
    ctx.manageSelection(profile);
  };

  const isSelected = (checkId) => {
    return checkId === selected;
  };

  return (
    <List
      ListEmptyComponent={EmptyFriends}
      data={ctx.commonInterestFriends}
      renderItem={({item}: any) => (
        <SelectionContainer onPress={() => selectProfile(item.id)}>
          <FriendItem {...item} disabled onPress={() => null} />
          <Icon
            name={
              isSelected(item.id) ? 'radio-f' : 'checkbox-blank-circle-line'
            }
            color={Colors.primary}
            size={30}
          />
        </SelectionContainer>
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
};

const NearbyFriends = () => {
  const ctx = useContext(Context);
  const [selected, setSelected] = useState<any>(null);

  const selectProfile = (profile) => {
    setSelected(profile);
    ctx.manageSelection(profile);
  };

  const isSelected = (checkId) => {
    return checkId === selected;
  };

  return (
    <List
      ListEmptyComponent={EmptyFriends}
      data={ctx.nearbyFriends}
      renderItem={({item}: any) => (
        <SelectionContainer onPress={() => selectProfile(item.id)}>
          <ProfileContainer>
            <FriendItem {...item} disabled onPress={() => null} />
          </ProfileContainer>
          <Icon
            name={
              isSelected(item.id) ? 'radio-f' : 'checkbox-blank-circle-line'
            }
            color={Colors.primary}
            size={30}
          />
        </SelectionContainer>
      )}
      keyExtractor={(item, index) => `${index}`}
    />
  );
};

const Screen: React.FunctionComponent<any> = (props) => {
  const {route, navigation} = props;
  const user = useSelector((state: IRootState) => state.authReducer.user);
  let _nearby: Friend[] = [];
  let _commonInterests: Friend[] = [];

  const selectedData = useRef<any>(null);

  if (!has(route, 'params.id')) {
    navigation.goBack();
  }

  if (Array.isArray(user.friends)) {
    _nearby = [...user.friends];
    _nearby = reject(_nearby, {id: route.params.id});
    _nearby = reject(_nearby, (val: any) => {
      if (has(val, 'user_privacy_setting.invisible_mode')) {
        if (val.user_privacy_setting.invisible_mode) {
          return true;
        }
      }
      return false;
    });
  }

  if (Array.isArray(user.friends_with_similar_interest)) {
    _commonInterests = [...user.friends_with_similar_interest];
    _commonInterests = reject(_commonInterests, {id: route.params.id});
    _commonInterests = reject(_commonInterests, (val: any) => {
      if (has(val, 'user_privacy_setting.invisible_mode')) {
        if (val.user_privacy_setting.invisible_mode) {
          return true;
        }
      }
      return false;
    });
  }

  const manageSelection = (_data) => {
    console.log(_data);
    selectedData.current = _data;
  };

  const getUserProfile = (_id) => {
    let profile = find(user.friends, {id: _id});
    profile = profile
      ? profile
      : find(user.friends_with_similar_interest, {id: _id});

    return profile;
  };

  const suggestProfiles = () => {
    props.navigation.navigate('SuggestFriendMessage', {
      suggestProfiles: [selectedData.current],
      suggestionProfile: getUserProfile(selectedData.current),
      receiver: route.params.id,
    });
  };

  return (
    <Page>
      <Context.Provider
        value={{
          receiver: route.id,
          nearbyFriends: _nearby,
          commonInterestFriends: _commonInterests,
          manageSelection,
        }}>
        <Tab.Navigator
          tabBarOptions={{
            labelStyle: {
              fontSize: s(14),
              fontFamily: Fonts.OPEN_SANS_SEMI_BOLD,
              textTransform: 'capitalize',
            },
          }}>
          <Tab.Screen name="Nearby" component={NearbyFriends} />
          <Tab.Screen
            name="Common Interest"
            component={CommonInterestFriends}
          />
        </Tab.Navigator>
        <Button text="Suggest" onPress={suggestProfiles} />
      </Context.Provider>
    </Page>
  );
};

export default Screen;
