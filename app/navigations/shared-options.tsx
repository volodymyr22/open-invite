import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationOptions} from '@react-navigation/stack';
import styles, {
  Title,
  HeaderWrapper,
  HeaderButton,
  optionsStyles,
  triggerStyles,
} from './styles';
import {Text, Icon, BackBtn} from '@app/components/shared/stateless';
import {Colors, Metrics} from '@app/themes';
import {s} from 'react-native-size-matters';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {authTypes} from '@feature/constants';
import shareMyLink from '@helpers/share';
import {IRootState} from '@app/features/reducers';

export const HeaderRight = ({hideMore = false}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user: any = useSelector((state: IRootState) => state.authReducer.user);

  return (
    <HeaderWrapper>
      <HeaderButton onPress={() => navigation.navigate('Search')}>
        <Icon name="search" size={s(20)} color={Colors.onPrimary} />
      </HeaderButton>
      {hideMore ? null : (
        <HeaderButton noPadding>
          <Menu>
            <MenuTrigger customStyles={triggerStyles}>
              <Icon
                name="more-vertical"
                size={s(20)}
                color={Colors.onPrimary}
              />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption onSelect={() => navigation.navigate('AboutUs')}>
                <Text>About</Text>
              </MenuOption>
              <MenuOption onSelect={() => shareMyLink(user)}>
                <Text>Share link</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => navigation.navigate('ImportContacts')}>
                <Text>Add contacts</Text>
              </MenuOption>
              <MenuOption
                onSelect={() =>
                  navigation.navigate('EditProfileModal', {scrollToEnd: true})
                }>
                <Text>Privacy Settings</Text>
              </MenuOption>
              <MenuOption onSelect={() => navigation.navigate('MyPlans')}>
                <Text>Plans & Requests</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => dispatch({type: authTypes.REQUEST_LOGOUT})}>
                <Text>Logout</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </HeaderButton>
      )}
    </HeaderWrapper>
  );
};

export const HeaderRightNoMore = () => {
  const navigation = useNavigation();

  return (
    <HeaderWrapper>
      <HeaderButton onPress={() => navigation.navigate('Search')}>
        <Icon name="search" size={s(20)} color={Colors.onPrimary} />
      </HeaderButton>
    </HeaderWrapper>
  );
};

export const HeaderLeft = () => <Title>oInvite</Title>;

export const rootHeaderType1 = (
  hideMore = false,
  showBackBtn = false,
): StackNavigationOptions => ({
  headerTitle: '',
  headerStyle: {
    height: Metrics.HEADER_HEIGHT,
  },
  headerTransparent: true,
  headerLeft: () =>
    showBackBtn ? <BackBtn color={Colors.onPrimary} /> : <HeaderLeft />,
  headerRight: () => <HeaderRight hideMore={hideMore} />,
});

export const rootHeaderType1WithoutMore = (
  showBackBtn = false,
): StackNavigationOptions => ({
  headerTitle: '',
  headerStyle: {
    height: Metrics.HEADER_HEIGHT,
  },
  headerTransparent: true,
  headerLeft: () =>
    showBackBtn ? <BackBtn color={Colors.onPrimary} /> : <HeaderLeft />,
  headerRight: () => <HeaderRightNoMore />,
});

export const rootHeaderType2 = (title: string): StackNavigationOptions => ({
  headerTitleAlign: 'left',
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: Colors.primary,
    height: Metrics.HEADER_HEIGHT,
  },
  headerTitle: title,
  headerTitleStyle: styles.primaryHeaderTitleStyle,
  headerRight: () => <HeaderRight hideMore />,
});

export const rootHeaderType3 = (title = ''): StackNavigationOptions => ({
  headerTitleAlign: 'left',
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: Colors.primary,
    height: Metrics.HEADER_HEIGHT,
  },
  headerLeft: () => <BackBtn color={Colors.onPrimary} />,
  headerTitleStyle: styles.primaryHeaderTitleStyle,
  headerTitle: title,
});
