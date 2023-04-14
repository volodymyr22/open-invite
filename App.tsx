import React, {useEffect} from 'react';
import {AppState, ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import configureStore from '@app/config/store';
import {
  SplashPage,
  Splash,
  SplashLoader,
} from '@app/components/shared/stateless';
import Main from '@app/Main';
import {_handleAppStateChange} from '@helpers/appStateChangeHandler';

declare const global: {HermesInternal: null | {}};

export const {store, persistor} = configureStore();

const App = () => {
  useEffect(() => {
    AppState.addEventListener('change', (_next) =>
      _handleAppStateChange(_next, store),
    );

    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        console.log('[DYNAMIC LINK]', link);
      });

    return () => {
      AppState.removeEventListener('change', (_next) =>
        _handleAppStateChange(_next, store),
      );
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <SplashPage>
            <Splash />
            <SplashLoader>
              <ActivityIndicator size="large" />
            </SplashLoader>
          </SplashPage>
        }
        persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
};

console.disableYellowBox = true;
export default App;
