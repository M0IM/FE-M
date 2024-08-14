import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppSetupContainer from './src/containers/AppSetupContainer.tsx';
import RootNavigator from './src/navigators/root/RootNavigator.tsx';
import {DevToolsBubble} from 'react-native-react-query-devtools';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Sending']);

import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: 'pink'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};

function App() {
  return (
    <AppSetupContainer>
      <GestureHandlerRootView>
        <RootNavigator />
        <Toast config={toastConfig} />
        {/*<DevToolsBubble />*/}
      </GestureHandlerRootView>
    </AppSetupContainer>
  );
}

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

if (__DEV__) {
  require('./ReactotronConfig');
}

export default AppEntryPoint;
