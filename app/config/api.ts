import {create, ApisauceInstance} from 'apisauce';

interface CONFIG {
  baseURL: string;
}

interface Environment {
  testing: CONFIG;
  production: CONFIG;
}

const API_CONFIG: Environment = {
  testing: {
    baseURL: 'http://localhost:8080/api/v1',
  },
  production: {
    baseURL: 'http://162.243.47.12:8080/api/v1',
  },
};

class Api {
  instance: ApisauceInstance;

  constructor(config: CONFIG) {
    this.instance = create({
      baseURL: config.baseURL,
      timeout: 30000,
      headers: {},
    });
  }
}

class GoogleMapsApi {
  instance: ApisauceInstance;

  constructor() {
    this.instance = create({
      baseURL: 'https://maps.googleapis.com/maps/api/',
      timeout: 30000,
      headers: {},
    });
  }
}

const api = new Api(API_CONFIG.production);
const googlePlacesApi = new GoogleMapsApi().instance;

export {googlePlacesApi};
export default api.instance;
