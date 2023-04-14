import {s} from 'react-native-size-matters';
import {Platform} from 'react-native';

const Metrics: any = {
  BORDER_RADIUS: s(4),
  HEADER_HEIGHT: Platform.select({
    ios: s(75),
    android: s(60),
  }),
};

export default Metrics;
