import {ReactElement} from 'react';
import TanstackQueryContainer from './TanstackQueryContainer.tsx';
import ErrorBoundaryContainer from './ErrorBoundaryContainer.tsx';
import NavigatorContainer from './NavigatorContainer.tsx';
import {SafeAreaProvider} from 'react-native-safe-area-context';

interface IAppSetupContainer {
  children: ReactElement;
}

export default function AppSetupContainer({children}: IAppSetupContainer) {
  return (
    <TanstackQueryContainer>
      <NavigatorContainer>
        <ErrorBoundaryContainer>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </ErrorBoundaryContainer>
      </NavigatorContainer>
    </TanstackQueryContainer>
  );
}
