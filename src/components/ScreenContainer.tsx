import React, {ReactNode} from 'react';
import {
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

type TScreenContainerProps = {
  children: React.ReactNode;
  loading?: boolean;
  fixedTopComponent?: ReactNode;
  fixedBottomComponent?: ReactNode;
};

export function ScreenContainer({
  children,
  loading = false,
  fixedTopComponent,
  fixedBottomComponent,
}: TScreenContainerProps) {
  return (
    <View className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView className="flex-1">
          {fixedTopComponent && (
            <View className="right-0 left-0 h-10 flex-col justify-center px-3 mb-3">
              {fixedTopComponent}
            </View>
          )}
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 30,
              paddingHorizontal: 20,
              flexGrow: 1,
              gap: 10,
            }}
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
    </View>
  );
}