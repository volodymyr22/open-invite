import RNLocation, {Location} from 'react-native-location';
import {authTypes, globalTypes} from '@feature/constants';
import {Alert} from 'react-native';

class LocationHelper {
  constructor() {
    RNLocation.configure({
      distanceFilter: 20000,
      desiredAccuracy: {
        ios: 'threeKilometers',
        android: 'balancedPowerAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 5000,
      fastestInterval: 10000,
      maxWaitTime: 5000,
      // iOS Only
      activityType: 'other',
      allowsBackgroundLocationUpdates: false,
      headingFilter: 1,
      headingOrientation: 'portrait',
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: false,
    });
  }

  async managePermissions(message = ''): Promise<boolean> {
    try {
      const hasPermission: boolean = await RNLocation.checkPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse', // or 'fine'
        },
      });

      console.log('[Has location permission]', hasPermission);

      if (!hasPermission) {
        const permissionGranted: boolean = await RNLocation.requestPermission({
          ios: 'whenInUse',
          android: {
            detail: 'coarse',
            rationale: {
              title: 'We need to access your location',
              message: message
                ? message
                : 'We use your location to show where you are on the map',
              buttonPositive: 'OK',
              buttonNegative: 'Cancel',
            },
          },
        });

        return permissionGranted;
      }

      return hasPermission;
    } catch (ex) {
      throw 'Error getting location permission';
    }
  }

  async getCurrentLocation(): Promise<Location> {
    const location: Location | null = await RNLocation.getLatestLocation({
      timeout: 5000,
    });
    if (location) {
      return location;
    } else {
      throw 'Location data not available';
    }
  }

  async requestLocation(dispatch, user): Promise<boolean> {
    const hasPermission = await this.managePermissions();
    if (!hasPermission) {
      Alert.alert(
        'Warning',
        'Please allow location access to get accurate result',
      );
    } else {
      this.getCurrentLocation()
        .then((location) => {
          dispatch({type: globalTypes.UPDATE_LOCATION, location});
        })
        .catch((ex) => console.log(ex));
    }
    return hasPermission;
  }
}

export default new LocationHelper();
