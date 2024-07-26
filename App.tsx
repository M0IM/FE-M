import AppSetupContainer from './src/containers/AppSetupContainer.tsx';
import RootNavigator from './src/navigators/root/RootNavigator.tsx';


function App() {
  return (
    <AppSetupContainer>
      <RootNavigator />
    </AppSetupContainer>
  );
}

let AppEntryPoint = App;

if (process.env.STORYBOOK_ENABLED) {
  AppEntryPoint = require('./.ondevice').default;
}

export default AppEntryPoint;
