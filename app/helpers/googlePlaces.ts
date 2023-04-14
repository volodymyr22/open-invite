import qs from 'qs';
import {has} from 'lodash';
import {googlePlacesApi} from '@api';

import {KEYS} from '@config/constants';

export const getReverseGeocodeText = async (
  latitude,
  longitude,
): Promise<string> => {
  if (!latitude || !longitude) {
    return '';
  }

  try {
    const result: any = await googlePlacesApi.get(
      'geocode/json?' +
        qs.stringify({
          latlng: latitude + ',' + longitude,
          key: KEYS.GOOGLE_MAPS,
        }),
    );
    if (has(result, 'data.results')) {
      if (Array.isArray(result.data.results)) {
        return result.data.results[0]
          ? result.data.results[0].formatted_address
          : '';
      }
    }

    return '';
  } catch (ex) {
    throw ex;
  }
};
