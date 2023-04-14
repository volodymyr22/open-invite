/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {vs, s} from 'react-native-size-matters';
import {useSelector, useDispatch} from 'react-redux';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {
  Button,
  FriendItem,
  List,
  Text,
  FriendsOnMap,
  Seperator,
  Icon,
  Spacer,
} from '@component/shared/stateless';
import styles, {
  Wrapper,
  TabItemWrap,
  ListWrap,
  HeaderWrap,
  EmptyContainer,
  SortContainer,
  SortSelectedWrap,
} from './styles';
import {Fonts, Colors} from '@app/themes';
import {IRootState} from '@app/features/reducers';
import shareMyLink from '@helpers/share';
import {authTypes} from '@app/features/constants';
import LocationHelper from '@helpers/location';

const Tab = createMaterialTopTabNavigator();
const {height} = Dimensions.get('window');

const SORT_OPTIONS = {
  nearby: 'Nearby Friends',
  available: 'Available Now',
  availableSoon: 'Available Soon',
};

const EmptyFriends = () => {
  const user = useSelector((state: IRootState) => state.authReducer.user);

  return (
    <EmptyContainer>
      <Seperator height={25} />
      <Text center>You have no friends at the moment</Text>
      <Button
        text="Add friends"
        fillType="plain"
        onPress={() => shareMyLink(user)}
      />
    </EmptyContainer>
  );
};

const Sorter = ({onSelect}) => {
  const sortedBy = useSelector(
    (state: IRootState) => state.authReducer.sortedBy,
  );
  const [selected, setSelected] = useState(sortedBy || 'nearby');

  return (
    <SortContainer>
      <Text weight="semibold" size={12} color={Colors.lightText}>
        Sort by
      </Text>
      <Spacer />
      <Menu>
        <MenuTrigger>
          <SortSelectedWrap>
            <Text weight="bold">{SORT_OPTIONS[selected]}</Text>
            <Icon name="arrow-down" size={20} />
          </SortSelectedWrap>
        </MenuTrigger>
        <MenuOptions>
          {Object.keys(SORT_OPTIONS).map((opt) => (
            <MenuOption
              key={opt}
              onSelect={() => {
                setSelected(opt);
                onSelect(opt);
              }}>
              <Text left={5}>{SORT_OPTIONS[opt]}</Text>
            </MenuOption>
          ))}
        </MenuOptions>
      </Menu>
    </SortContainer>
  );
};

const Friends: React.FunctionComponent<any> = (props) => {
  const {noMap} = props;
  const {user}: any = useSelector((state: IRootState) => state.authReducer);

  const dispatch = useDispatch();
  const [isList, setIsList] = useState(true);
  return (
    <TabItemWrap>
      <HeaderWrap>
        {isList ? (
          <Sorter
            onSelect={(opt) => {
              const _sortBy = opt === 'nearby' || opt === '' ? '' : opt;
              dispatch({type: authTypes.GET_CURRENT_USER, _sortBy});
            }}
          />
        ) : (
          <View />
        )}
        {noMap || user.friends?.length === 0 ? null : (
          <Button
            fillType="plain"
            size="sm"
            text={!isList ? 'List View' : 'Map View'}
            iconName={!isList ? 'menu-line' : 'road-map-line'}
            onPress={() => {
              LocationHelper.requestLocation(dispatch, user)
                .then(() => {
                  setIsList(!isList);
                })
                .catch(() => {
                  setIsList(!isList);
                });
            }}
          />
        )}
      </HeaderWrap>

      <ListWrap>
        {!isList ? (
          <FriendsOnMap friends={user.friends} />
        ) : (
          <List
            ListEmptyComponent={EmptyFriends}
            data={user.friends}
            renderItem={({item}: any) => <FriendItem {...item} />}
            keyExtractor={(item, index) => `${index}`}
          />
        )}
      </ListWrap>
    </TabItemWrap>
  );
};

const FriendsOfFriends: React.FunctionComponent<any> = (props) => {
  const {noMap} = props;
  const {user}: any = useSelector((state: IRootState) => state.authReducer);

  const [isList, setIsList] = useState(true);
  const dispatch = useDispatch();
  return (
    <TabItemWrap>
      <HeaderWrap>
        {isList ? (
          <Sorter
            onSelect={(opt) => {
              const _sortBy = opt === 'nearby' || opt === '' ? '' : opt;
              dispatch({type: authTypes.GET_CURRENT_USER, _sortBy});
            }}
          />
        ) : (
          <View />
        )}
        {noMap || user.friends_of_friends?.length === 0 ? null : (
          <Button
            fillType="plain"
            size="sm"
            text={!isList ? 'List View' : 'Map View'}
            iconName={!isList ? 'menu-line' : 'road-map-line'}
            onPress={() => setIsList(!isList)}
          />
        )}
      </HeaderWrap>
      <ListWrap>
        {!isList ? (
          <FriendsOnMap friends={user.friends_of_friends} />
        ) : (
          <List
            ListEmptyComponent={EmptyFriends}
            data={user.friends_of_friends}
            renderItem={({item}: any) => <FriendItem {...item} />}
            keyExtractor={(item, index) => `${index}`}
          />
        )}
      </ListWrap>
    </TabItemWrap>
  );
};

const FriendsWithCommonInterests: React.FunctionComponent<any> = (props) => {
  const {noMap} = props;
  const {user}: any = useSelector((state: IRootState) => state.authReducer);
  const [isList, setIsList] = useState(true);
  const dispatch = useDispatch();
  return (
    <TabItemWrap>
      <HeaderWrap>
        {isList ? (
          <Sorter
            onSelect={(opt) => {
              const _sortBy = opt === 'nearby' || opt === '' ? '' : opt;
              dispatch({type: authTypes.GET_CURRENT_USER, _sortBy});
            }}
          />
        ) : (
          <View />
        )}
        {noMap || user.friends_with_similar_interest?.length === 0 ? null : (
          <Button
            fillType="plain"
            size="sm"
            text={!isList ? 'List View' : 'Map View'}
            iconName={!isList ? 'menu-line' : 'road-map-line'}
            onPress={() => setIsList(!isList)}
          />
        )}
      </HeaderWrap>
      <ListWrap>
        {!isList ? (
          <FriendsOnMap friends={user.friends_with_similar_interest} />
        ) : (
          <List
            ListEmptyComponent={EmptyFriends}
            data={user.friends_with_similar_interest}
            renderItem={({item}: any) => <FriendItem {...item} />}
            keyExtractor={(item, index) => `${index}`}
          />
        )}
      </ListWrap>
    </TabItemWrap>
  );
};

const wrapScreen = (Component: any, props: any) => {
  return () => {
    return (
      <Wrapper style={{...props.heightConstrain}}>
        <Component {...props} />
      </Wrapper>
    );
  };
};

const FriendList: React.FunctionComponent<any> = (props) => {
  const {fullSize, noMap} = props;
  const heightConstrain = fullSize ? {} : {height: height - vs(240)};
  const customProps = {heightConstrain, noMap: noMap};
  return (
    <Tab.Navigator
      tabBarOptions={{
        scrollEnabled: true,
        tabStyle: {
          width: s(160),
        },
        labelStyle: {
          width: 400,
          fontSize: s(13),
          fontFamily: Fonts.OPEN_SANS_SEMI_BOLD,
          textTransform: 'capitalize',
        },
      }}>
      <Tab.Screen
        name="Your Friends"
        component={wrapScreen(Friends, customProps)}
        options={{
          tabBarLabel: ({focused}: any) => (
            <View style={styles.tabWidth}>
              <Text center weight={focused ? 'bold' : 'regular'}>
                Your Friends
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Friends of Friends"
        component={wrapScreen(FriendsOfFriends, customProps)}
        options={{
          tabBarLabel: ({focused}: any) => (
            <View style={styles.tabWidth}>
              <Text center weight={focused ? 'bold' : 'regular'}>
                Friends of Friends
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Common Interests"
        component={wrapScreen(FriendsWithCommonInterests, customProps)}
        options={{
          tabBarLabel: ({focused}: any) => (
            <View style={[{width: 350}]}>
              <Text center weight={focused ? 'bold' : 'regular'}>
                Common Interests
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default FriendList;
