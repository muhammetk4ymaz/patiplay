import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {NativeBaseProvider, theme} from 'native-base';
import {EventProvider} from 'react-native-outside-press';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashView from './src/views/splash';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <EventProvider>
          <GestureHandlerRootView>
            <BottomSheetModalProvider>
              <SplashView />
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </EventProvider>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
