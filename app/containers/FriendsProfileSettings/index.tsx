import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Page, Item, ListSeperator, ItemText} from './styles';
import {FlatList, Alert} from 'react-native';
import {has} from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ReportProfile} from '@component/modals';
import Api from '@api';

import {Text, Seperator} from '@component/shared/stateless';
import {IRootState} from '@app/features/reducers';
import showSnackBar from '@app/components/notifications/snackbar';
import {authTypes} from '@app/features/constants';

const list = [
  {
    id: 'message',
    title: 'Message',
    modal: false,
    to: 'IndividualChat',
  },
  {
    id: 'report',
    title: 'Report Profile',
    modal: true,
    to: '',
  },
  {
    id: 'block',
    title: 'Block Profile',
    description:
      "You will no longer be connected or won't be able to message each other or see each others profile",
    modal: true,
    to: '',
  },
  {
    id: 'unblock',
    title: 'Unblock Users',
    modal: true,
    to: 'UnblockUsers',
  },
];

const Screen: React.FunctionComponent<any> = (props) => {
  const {route} = props;
  const [openModal, setOpenModal] = useState('');
  const user = useSelector((state: IRootState) => state.authReducer.user);
  const dispatch = useDispatch();

  if (!has(route, 'params.id')) {
    return null;
  }

  const openItem = (item: any) => {
    if (item.modal) {
      setOpenModal(item.id);
    } else {
      props.navigation.navigate(item.to);
    }
  };

  const onSelectReason = (reason: string) => {
    Alert.alert('Are you sure you want to report this?', `"${reason}"`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          setOpenModal('');
          Api.post('/users/report', {
            message: reason,
            receiver_user_id: route.params.id,
            sender_user_id: user.id,
            sender_user_name: user.name,
            suggested_user_ids: '',
          })
            .then(() => {
              Alert.alert('User reported!');
            })
            .catch((ex) => console.log(ex));
        },
      },
    ]);
  };

  const renderItem = ({item}: any) => {
    const manageOpenItem = () => {
      if (item.id === 'message') {
        props.navigation.navigate(item.to, {...route.params});
      } else if (['report', 'message'].indexOf(item.id) >= 0) {
        openItem(item);
      } else if (item.id === 'block') {
        Alert.alert(
          'Do you want to block this user?',
          "You will no longer be connected or won't be able to message each other or see each others profile",
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: () => {
                setOpenModal('');
                Api.post('users/block', {
                  message: 'Block this user',
                  receiver_user_id: route.params.id,
                  sender_user_id: user.id,
                  sender_user_name: user.name,
                  suggested_user_ids: '',
                })
                  .then(() => {
                    props.navigation.navigate('Home');
                    showSnackBar('User has been blocked successfuly!');
                    dispatch({type: authTypes.GET_CURRENT_USER});
                  })
                  .catch((ex) => console.log(ex));
              },
            },
          ],
        );
      } else if (item.id === 'unblock') {
        props.navigation.navigate(item.to, {...route.params});
      }
    };

    return (
      <TouchableOpacity onPress={manageOpenItem}>
        <Item>
          <ItemText>{item.title}</ItemText>

          {item.description ? (
            <>
              <Seperator height={5} />
              <Text weight="light" size={12}>
                {item.description}
              </Text>
            </>
          ) : null}
        </Item>
      </TouchableOpacity>
    );
  };

  return (
    <Page>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={ListSeperator}
      />
      <ReportProfile
        isVisible={openModal === 'report'}
        closeModal={() => setOpenModal('')}
        selectReason={onSelectReason}
      />
    </Page>
  );
};

export default Screen;
