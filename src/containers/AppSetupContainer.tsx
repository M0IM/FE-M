import {ReactElement} from 'react';
import TanstackQueryContainer from './TanstackQueryContainer.tsx';
import ErrorBoundaryContainer from './ErrorBoundaryContainer.tsx';

interface IAppSetupContainer {
  children: ReactElement;
}

export default function AppSetupContainer({children}: IAppSetupContainer) {
  return (
    <TanstackQueryContainer>
      <ErrorBoundaryContainer>{children}</ErrorBoundaryContainer>
    </TanstackQueryContainer>
  );
}
