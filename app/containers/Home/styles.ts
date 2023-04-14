import styled from 'styled-components/native';
import {Images, Colors} from '@app/themes';

export const Page = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const WrapPage = styled.ImageBackground.attrs({
  source: Images.bg,
  resizeMode: 'cover',
})`
  background: ${Colors.primary};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 75%;
  flex: 1;
`;
