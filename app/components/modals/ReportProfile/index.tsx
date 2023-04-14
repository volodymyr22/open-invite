import React from 'react';
import {Modal} from 'react-native';
import {IconButton, Text} from '@app/components/shared/stateless';

import {Reasons} from './reasons';
import {Page, Container, Header, CustomList, ItemContainer} from './styles';

const ReportProfile: React.FunctionComponent<any> = (props) => {
  const {isVisible, closeModal, selectReason} = props;
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <Page>
        <Container>
          <Header>
            <Text>Tell us more</Text>

            <IconButton
              iconName="close-line"
              preset="secondary"
              onPress={closeModal}
            />
          </Header>
          <CustomList
            data={Reasons}
            renderItem={({item}: any) => (
              <ItemContainer onPress={() => selectReason(item.text)}>
                <Text>{item.text}</Text>
              </ItemContainer>
            )}
          />
        </Container>
      </Page>
    </Modal>
  );
};

export default ReportProfile;
