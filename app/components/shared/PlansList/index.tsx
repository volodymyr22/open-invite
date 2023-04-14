/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {s} from 'react-native-size-matters';
import Timeline from 'react-native-timeline-flatlist';

import {Text, Button} from '@component/shared/stateless';

import {
  PlansContainer,
  StepperContainer,
  StepItemContainer,
  DetailsContainer,
  NoPlansContainer,
} from './styles';
import {Colors} from '@app/themes';

const NoPlans = ({msg}) => (
  <NoPlansContainer>
    <Text center color={Colors.darkText}>
      {msg}
    </Text>
  </NoPlansContainer>
);

const PlansList: React.FunctionComponent<any> = (props) => {
  const {title, plans = [], emptyMsg = 'You have no plans'} = props;
  const navigation = useNavigation();

  const renderEvent = (label, sectionID, rowID) => (
    <StepItemContainer>
      <DetailsContainer>
        <Text size={14} weight="bold">
          {label.time}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          size={13}
          color={Colors.darkText}>
          {label.description}
        </Text>
      </DetailsContainer>
      <Button
        text="View"
        fillType="outlined"
        onPress={() => navigation.navigate('MyPlans')}
      />
    </StepItemContainer>
  );

  return (
    <PlansContainer>
      <Text weight="bold" size={18} bottom={10}>
        {title}
      </Text>
      {plans.length === 0 ? (
        <NoPlans msg={emptyMsg} />
      ) : (
        <StepperContainer noLeft={plans.length === 1}>
          <Timeline
            showTime={false}
            data={plans}
            circleSize={s(13)}
            circleColor={
              plans.length === 1 ? Colors.transparent : Colors.orange
            }
            lineColor={Colors.secondaryVariant}
            renderDetail={renderEvent}
            separator={false}
            eventDetailStyle={{
              paddingTop: 0,
            }}
            detailContainerStyle={{
              marginBottom: 25,
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 0,
              borderRadius: 10,
            }}
          />
        </StepperContainer>
      )}
    </PlansContainer>
  );
};

export default PlansList;
