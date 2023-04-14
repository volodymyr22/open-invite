import styled from 'styled-components/native';
import {s} from 'react-native-size-matters';
import {Images, Colors, Metrics, Fonts} from '@app/themes';
import {StyleSheet} from 'react-native';

export const Page = styled.ImageBackground.attrs({
  source: Images.landing,
  resizeMode: 'cover',
})`
  flex: 1;
  padding: 0 ${s(40)}px;
  justify-content: center;
`;

export const HeaderLogo = styled.Image.attrs({
  source: Images.aboutus_logo,
  resizeMode: 'contain',
})`
  height: ${s(40)}px;
  width: 100%;
`;

export const Content = styled.View`
  background-color: ${Colors.background};
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20%;
  border-radius: ${Metrics.BORDER_RADIUS}px;
  padding: ${s(25)}px ${s(10)}px;
`;

export const AboutImg = styled.Image.attrs({
  source: Images.aboutus,
  resizeMode: 'contain',
})`
  height: ${s(150)}px;
  width: ${s(150)}px;
  margin-bottom: ${s(25)}px;
`;

export const AboutText = styled.Text`
  font-family: ${Fonts.OPEN_SANS_REGULAR};
  font-size: ${s(13)}px;
  text-align: center;
  width: 80%;
`;

export default StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
