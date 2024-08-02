import {ReactElement} from 'react';
import {LogBox, SafeAreaView, Text, View} from 'react-native';
import {ErrorBoundary} from 'react-error-boundary';

import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import {CustomButton} from '../components/@common/CustomButton/CustomButton.tsx';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

type ErrorBoundaryContainerProps = {children: ReactElement};

export default function ErrorBoundaryContainer({
  children,
}: ErrorBoundaryContainerProps) {
  const {reset} = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({resetErrorBoundary}) => (
        <SafeAreaView>
          <Text>잠시 후 다시 시도해주세요.</Text>
          <Text>잠시 후 다시 시도해주세요.</Text>
          <CustomButton
            label={'다시 시도'}
            size={'medium'}
            variant={'outlined'}
            onPress={resetErrorBoundary}
          />
        </SafeAreaView>
      )}>
      {children}
    </ErrorBoundary>
  );
}
