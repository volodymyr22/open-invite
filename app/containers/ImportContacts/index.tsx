/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {StatusBar, View, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Contact} from 'react-native-contacts';
import {filter} from 'lodash';

import getContactList from '@app/helpers/contact';
import {Text, List, Icon, Button, SafeArea} from '@component/shared/stateless';
import {Page, ContactContainer, PhoneWrap, SearchContainer} from './styles';
import {Colors, Constants} from '@app/themes';
import Api from '@api';
import {IRootState} from '@app/features/reducers';
import showSnackBar from '@app/components/notifications/snackbar';
import {Input} from '@app/components/shared/stateless/TextInput/styles';
import {KeyboardAvoiding} from '../EditProfile/styles';

const Screen: React.FunctionComponent<any> = (props) => {
  const [contacts, setContacts] = useState<Contact[]>();
  const [isInviting, setIsInviting] = useState(false);
  const user = useSelector((state: IRootState) => state.authReducer.user);
  const [selected, setSelected] = useState<string[]>([]);
  const navigation = useNavigation();
  const contactsList = useRef<any>([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isInviting ? (
          <ActivityIndicator />
        ) : (
          <Button text="Send" onPress={inviteSelectedContacts} />
        ),
    });

    getContactList()
      .then((_contacts: Contact[]) => {
        contactsList.current = _contacts;
        setContacts(_contacts);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  const manageSelection = (phoneNumber: string) => {
    const _index = selected.indexOf(phoneNumber);
    if (_index < 0) {
      setSelected([...selected, phoneNumber]);
    } else {
      const temp = [...selected];
      temp.splice(_index, 1);
      setSelected([...temp]);
    }
  };

  const isSelected = (phoneNumber: string): boolean => {
    return selected.indexOf(phoneNumber) >= 0;
  };

  const inviteSelectedContacts = () => {
    const selectedPhoneNums: string[] = [];
    selected.forEach((phoneNum) => {
      phoneNum = phoneNum.replace('(', '');
      phoneNum = phoneNum.replace(')', '');
      phoneNum = phoneNum.replace('-', '');
      phoneNum = phoneNum.replace(' ', '');

      selectedPhoneNums.push(phoneNum);
    });
    setIsInviting(true);
    Api.post(`/users/${user.id}/inviteContacts`, {
      contacts: selectedPhoneNums,
    })
      .then((res) => {
        setIsInviting(false);
        let hasError = false;
        if (Array.isArray(res.data)) {
          res.data.forEach((item: any) => {
            if (item.errorMessage) {
              hasError = true;
              showSnackBar(item.errorMessage, true);
            }
          });
        }

        if (!hasError) {
          showSnackBar('Contacts invited successfully');
          setSelected([]);
          props.navigation.goBack();
        }
      })
      .catch((ex) => {
        setIsInviting(false);
        showSnackBar(ex.message || 'Unable to invite contacts', true);
      });
  };

  const renderContact = ({item}) => {
    return (
      <ContactContainer>
        <Text size={16} weight="bold">
          {item.givenName} {item.familyName}
        </Text>
        {item.phoneNumbers.map((phoneNum, index) => (
          <PhoneWrap
            key={index}
            onPress={() => manageSelection(phoneNum.number)}>
            <View>
              <Text size={14} weight="semibold" bottom={5}>
                {phoneNum.label.toUpperCase()}
              </Text>
              <Text>{phoneNum.number}</Text>
            </View>
            <Icon
              name={
                isSelected(phoneNum.number)
                  ? 'checkbox-fill'
                  : 'checkbox-blank-line'
              }
              color={Colors.primary}
              size={30}
            />
          </PhoneWrap>
        ))}
      </ContactContainer>
    );
  };

  const searchContact = (searchName) => {
    const famName = filter(contactsList.current, (_contact) => {
      let hasInName = false;
      const _search = searchName.toLowerCase();
      const _name =
        _contact.givenName.toLowerCase() +
        ' ' +
        _contact.familyName.toLowerCase();

      if (_name.includes(_search)) {
        hasInName = true;
      }

      return hasInName;
    });

    setContacts(famName);
  };

  return (
    <Page>
      <StatusBar
        backgroundColor="rgba(255,255,255,0)"
        barStyle="light-content"
        translucent
      />
      <SafeArea>
        <KeyboardAvoiding behavior={Constants.KEYBOARD_AVOID}>
          <List
            stickyHeaderIndices={[0]}
            ListHeaderComponent={React.useMemo(
              () => (
                <SearchContainer>
                  <Input
                    placeholder="Search for people"
                    placeholderTextColor={Colors.secondaryVariant}
                    clearButtonMode="always"
                    inlineImageLeft="search_icon"
                    returnKeyType="search"
                    maxLength={100}
                    onChangeText={searchContact}
                  />
                </SearchContainer>
              ),
              [],
            )}
            data={contacts}
            renderItem={renderContact}
            keyExtractor={(item, index) => `${index}`}
          />
        </KeyboardAvoiding>
      </SafeArea>
    </Page>
  );
};

export default Screen;
