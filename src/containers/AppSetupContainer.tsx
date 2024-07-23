import {ReactElement} from 'react';
import TanstackQueryContainer from './TanstackQueryContainer.tsx';

interface IAppSetupContainer {
  children: ReactElement;
}

export default function AppSetupContainer({children}: IAppSetupContainer) {
  return <TanstackQueryContainer>{children}</TanstackQueryContainer>;
}
