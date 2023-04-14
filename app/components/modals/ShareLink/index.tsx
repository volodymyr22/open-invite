import React from 'react';
import {Modal} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Seperator} from '@app/components/shared/stateless';
import {Colors} from '@app/themes';
import {IRootState} from '@app/features/reducers';
import {GlobalState} from '@app/features/global/reducer';
import {globalTypes} from '@feature/constants';

import styles, {Page, Container, ModalCloser} from './styles';

const SEPERATOR_HEIGHT = 15;

const ShareLink: React.FunctionComponent<any> = () => {
  const globalReducer: GlobalState = useSelector(
    (state: IRootState) => state.globalReducer,
  );
  const dispatch = useDispatch();

  const closeModal = () => dispatch({type: globalTypes.SHARE_LINK_CLOSE});

  return (
    <Modal visible={globalReducer.shareLinkIsOpen} transparent>
      <Page>
        <BlurView
          style={styles.absolute}
          blurType="dark"
          blurAmount={5}
          reducedTransparencyFallbackColor="white"
        />
        <ModalCloser onPress={closeModal} />
        <Container>
          <Button
            onPress={closeModal}
            text="TWITTER"
            iconName="twitter"
            size="lg"
            preset="secondary"
            style={styles.buttonSpacing}
            iconStyles={{color: Colors.twitter}}
          />
          <Seperator height={SEPERATOR_HEIGHT} />
          <Button
            onPress={closeModal}
            text="MESSAGE"
            iconName="mail"
            size="lg"
            preset="secondary"
            style={styles.buttonSpacing}
            iconStyles={{color: Colors.orange}}
          />
          <Seperator height={SEPERATOR_HEIGHT} />
          <Button
            onPress={closeModal}
            text="FACEBOOK"
            iconName="facebook"
            size="lg"
            preset="secondary"
            style={styles.buttonSpacing}
            iconStyles={{color: Colors.facebook}}
          />
          <Seperator height={SEPERATOR_HEIGHT} />
          <Button
            onPress={closeModal}
            text="COPY LINK"
            iconName="links"
            size="lg"
            preset="secondary"
            style={styles.buttonSpacing}
            iconStyles={{color: Colors.copylink}}
          />
        </Container>
      </Page>
    </Modal>
  );
};

export default ShareLink;
