import React, {useEffect, useState, useCallback} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {debounce, has} from 'lodash';
import {useSelector} from 'react-redux';
import styles, {Page, SearchContainer, SearchInput, SafeArea} from './styles';
import {BackBtn, FriendItem, List} from '@app/components/shared/stateless';
import {Colors} from '@app/themes';
import Api from '@api';

const Screen: React.FunctionComponent<any> = () => {
  const [userList, setUserList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigation = useNavigation();
  const {user} = useSelector((state: IRootState) => state.authReducer);

  const userId = user.id;

  const searchText = async (text: string) => {
    try {
      const searchResult: any = await Api.get(
        `/users/search/${text}?userId=${userId}`,
      );

      if (has(searchResult, 'data.items')) {
        if (Array.isArray(searchResult.data.items)) {
          setUserList(searchResult.data.items);
        }
      }
      setIsSearching(false);
    } catch (ex) {
      setIsSearching(false);
      console.log('[SEARCH ERROR]', ex);
    }
  };

  const handler = useCallback(debounce(searchText, 2000), []);

  const onChangeText = (text: string) => {
    handler(text);
    setIsSearching(true);
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <SafeArea>
          <SearchContainer>
            <BackBtn />
            <SearchInput onChangeText={(text) => onChangeText(text)} />
          </SearchContainer>
        </SafeArea>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StatusBar backgroundColor={Colors.primary} barStyle="dark-content" />
      <Page>
        {isSearching ? (
          <ActivityIndicator style={styles.loadingWrapper} />
        ) : null}
        <List
          data={userList}
          renderItem={({item}: any) => <FriendItem {...item} />}
          keyExtractor={(item: any) => `${item.id}`}
        />
      </Page>
    </>
  );
};

export default Screen;
