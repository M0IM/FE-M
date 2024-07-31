import {ReactElement} from 'react';
import TanstackQueryContainer from './TanstackQueryContainer.tsx';
import ErrorBoundaryContainer from './ErrorBoundaryContainer.tsx';
import NavigatorContainer from './NavigatorContainer.tsx';

interface IAppSetupContainer {
  children: ReactElement;
}

export default function AppSetupContainer({children}: IAppSetupContainer) {
  return (
    <TanstackQueryContainer>
      <NavigatorContainer>
        <ErrorBoundaryContainer>{children}</ErrorBoundaryContainer>
      </NavigatorContainer>
    </TanstackQueryContainer>
  );
}
