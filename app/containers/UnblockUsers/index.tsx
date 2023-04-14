/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Api from '@api';
import {Text, List, Avatar, Button} from '@component/shared/stateless';
import {IRootState} from '@app/features/reducers';

import styles, {Page, Item, ContentWrapper, CenterPage} from './styles';
import {Colors} from '@app/themes';
import {ActivityIndicator} from 'react-native';
import {authTypes} from '@app/features/constants';
import showSnackBar from '@app/components/notifications/snackbar';

const Screen: React.FunctionComponent<any> = () => {
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState<boolean>(false);
  const [userList, setUserList] = useState<any>([]);
  const [unblocked, setUnblocked] = useState<any>([]);
  const user = useSelector((state: IRootState) => state.authReducer.user);

  const getBlockedUsersList = () => {
    setFetching(true);
    Api.get(`/users/blocked-user/${user.id}`)
      .then((res) => {
        if (res.ok) {
          setUserList(res.data);
        }
        setFetching(false);
      })
      .catch((ex) => {
        console.log(ex);
        setFetching(false);
      });
  };

  useEffect(() => {
    getBlockedUsersList();
  }, []);

  const unblockUser = (_id) => {
    Api.get(`users/un-block?userId=${user.id}&unblockId=${_id}`)
      .then((res: any) => {
        if (res.ok) {
          setUnblocked([...unblocked, `${_id}`]);
          dispatch({type: authTypes.GET_CURRENT_USER});
        } else {
          showSnackBar(res.data.message || 'Unable to unblock user', true);
        }
      })
      .catch((ex) => {
        console.log(ex);
        showSnackBar(ex.message || 'Unable to unblock user', true);
      });
  };

  const isUserUnblocked = (_id) => {
    return unblocked.indexOf(_id) >= 0 ? true : false;
  };

  const fetchingList = (
    <CenterPage>
      <ActivityIndicator />
      <Text style={styles.emptyText}>Fetching list...</Text>
    </CenterPage>
  );

  const noBlockedUsers = (
    <CenterPage>
      <Text style={styles.emptyText} center>
        You have not blocked any users
      </Text>
    </CenterPage>
  );

  const blockdUsersList = (
    <List
      data={userList}
      renderItem={({item}: any) => (
        <Item>
          <ContentWrapper>
            <Avatar imageUrl={item.profile_picture} size="sm" />
            <Text
              left={15}
              weight="semibold"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.nameStyle}>
              {item.name}
            </Text>
          </ContentWrapper>
          {isUserUnblocked(`${item.id}`) ? (
            <Text color={Colors.primary}>UNBLOCKED</Text>
          ) : (
            <Button
              text="Unblock"
              onPress={() => unblockUser(item.id)}
              size="sm"
            />
          )}
        </Item>
      )}
    />
  );

  return (
    <Page>
      {fetching
        ? fetchingList
        : userList.length <= 0
        ? noBlockedUsers
        : blockdUsersList}
    </Page>
  );
};

export default Screen;
