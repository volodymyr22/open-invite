import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import {Avatar, IconButton} from '@component/shared/stateless';
import Api from '@api';

import styles, {EditAvatarContainer} from './styles';
import {IRootState} from '@app/features/reducers';
import showSnackBar from '@app/components/notifications/snackbar';
import {authTypes} from '@feature/constants';

const createFormData = (photo, body) => {
  const data = new FormData();
  const _date = new Date().toISOString();

  data.append('file', {
    name: `${body.id}_${_date}_${photo.filename}`,
    type: photo.mime,
    uri:
      Platform.OS === 'android'
        ? photo.path
        : photo.path.replace('file://', ''),
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

const EditAvatar: React.FunctionComponent<any> = (props) => {
  const {imageUrl} = props;
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(imageUrl);
  const user = useSelector((state: IRootState) => state.authReducer.user);

  useEffect(() => {
    setUploadedImage(imageUrl);
  }, [imageUrl]);

  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image: any) => {
      setIsUploading(true);
      Api.put(`/users/${user.id}/image`, createFormData(image, {id: user.id}), {
        headers: {
          'Content-type': 'multipart/form-data',
          accept: 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            showSnackBar('Unable to update profile picture', true);
            setUploadedImage(imageUrl);
          } else {
            showSnackBar('Profile picture updated');
            dispatch({type: authTypes.GET_CURRENT_USER});
          }
          setIsUploading(false);
        })
        .catch((ex) => {
          showSnackBar('Unable to update profile picture', true);
          setUploadedImage(imageUrl);
          setIsUploading(false);
        });
    });
  };

  return (
    <EditAvatarContainer>
      <Avatar imageUrl={uploadedImage} size="lg" isLoading={isUploading} />
      <IconButton
        iconName="pencil"
        style={styles.editIcon}
        onPress={openPicker}
      />
    </EditAvatarContainer>
  );
};

export default EditAvatar;
