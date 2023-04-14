import styled from 'styled-components/native';
import {Colors} from '@app/themes';

export const Page = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  bounces: false,
})`
  flex: 1;
  background: ${Colors.background};
`;
