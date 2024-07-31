import {NavigationContainer} from '@react-navigation/native';
import {ReactElement} from 'react';

type NavigatorContainerProps = {children: ReactElement};

const NavigatorContainer = ({children}: NavigatorContainerProps) => {
  return (
    <NavigationContainer independent={true}>{children}</NavigationContainer>
  );
};

export default NavigatorContainer;
