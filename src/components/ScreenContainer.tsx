import React, {ReactNode} from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollViewProps,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface TScreenContainerProps extends ScrollViewProps {
  children: React.ReactNode;
  loading?: boolean;
  fixedTopComponent?: ReactNode;
  fixedBottomComponent?: ReactNode;
  keyboardVerticalOffset?: number;
  enabled?: boolean;
}

export function ScreenContainer({
  children,
  loading = false,
  fixedTopComponent,
  fixedBottomComponent,
  keyboardVerticalOffset = 0,
  enabled = true,
  ...props
}: TScreenContainerProps) {
  return (
    <GestureHandlerRootView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        enabled={enabled}
        keyboardVerticalOffset={keyboardVerticalOffset}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView className="flex-1">
          {fixedTopComponent && (
            <View className="right-0 left-0 h-10 flex-col justify-center px-3 mb-3">
              {fixedTopComponent}
            </View>
          )}
          <ScrollView
            {...props}
            contentContainerStyle={{
              paddingBottom: 40,
              paddingHorizontal: 20,
              flexGrow: 1,
              gap: 20,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}>
            {loading ? (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color={'#00F0A1'} />
              </View>
            ) : (
              children
            )}
          </ScrollView>
          {fixedBottomComponent && (
            <View className="absolute right-0 left-0 bottom-3 m-5 flex-row items-center justify-center gap-y-2">
              {fixedBottomComponent}
            </View>
          )}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}
