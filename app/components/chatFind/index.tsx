/* eslint-disable react-hooks/exhaustive-deps */

import React, {useState} from 'react';
import {StatusBar, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {s} from 'react-native-size-matters';

import {
  Page,
  SearchContainer,
  SearchInput,
  SafeArea,
  ButtonContainer,
} from './styles';

import {List, Icon, MessageItem} from '@app/components/shared/stateless';
import {Colors} from '@app/themes';

const Screen: React.FunctionComponent<any> = (props) => {
  const navigation = useNavigation();
  const {goBackHandler, chatUserList} = props;
  const [userList, setUserList] = useState([]);

  const searchText = (text: string) => {
    if (text.length > 0) {
      const searchResult: any = chatUserList.filter((user) => {
        return (
          user.name.indexOf(text.toUpperCase()) >= 0 ||
          user.name.indexOf(text.toLowerCase()) >= 0 ||
          user.name.indexOf(text) >= 0
        );
      });
      setUserList(searchResult);
    }
  };

  const onChangeText = (text: string) => {
    searchText(text);
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.primary} barStyle="dark-content" />
      <SafeArea>
        <SearchContainer>
          <TouchableOpacity onPress={goBackHandler}>
            <ButtonContainer>
              <Icon name="arrow-left" size={s(27)} color={Colors.darkText} />
            </ButtonContainer>
          </TouchableOpacity>
          <SearchInput onChangeText={(text) => onChangeText(text)} />
        </SearchContainer>
      </SafeArea>
      <Page>
        <List
          data={userList}
          renderItem={({item}: any) => (
            <MessageItem
              {...item}
              onPress={() => {
                navigation.navigate('IndividualChat', {
                  ...item,
                  id: Number(item.userId),
                });
                goBackHandler();
              }}
            />
          )}
          keyExtractor={(item: any) => `${item.id}`}
        />
      </Page>
    </>
  );
};

export default Screen;
