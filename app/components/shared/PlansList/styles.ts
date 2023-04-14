import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';

import {Colors} from '@app/themes';

export const PlansContainer = styled.View`
  flex: 1;
  margin: ${s(10)}px ${s(15)}px 0;
`;

export const StepperContainer = styled.View<any>`
  background: ${Colors.secondary};
  padding-top: ${s(25)}px;
  padding-right: ${s(25)}px;
  padding-left: ${({noLeft}) => (noLeft ? '0' : `${s(15)}px`)};
  border: 1px solid ${Colors.secondaryVariant};
`;

export const StepItemContainer = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const DetailsContainer = styled.View`
  flex: 1;
  padding-right: ${s(15)}px;
`;

export const NoPlansContainer = styled.View`
  background: ${Colors.background};
  padding: ${s(10)}px 0;
  border: 1px solid ${Colors.secondaryVariant};
`;
