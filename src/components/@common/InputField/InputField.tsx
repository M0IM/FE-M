import {ForwardedRef, ReactNode, forwardRef, useRef} from 'react';
import {
  Dimensions,
  Pressable,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import {Typography} from '../Typography/Typography.tsx';

import {mergeRefs} from '../../../utils/mergeRefs.ts';

interface IInputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched: boolean;
  icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

export const InputField = forwardRef(
  (
    {disabled = false, error, touched, icon = null, ...props}: IInputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          className={`
        border-0.5 border-gray-100 rounded-xl bg-gray-100
        ${deviceHeight > 700 ? 'p-4' : 'p-3'}
        ${disabled && 'bg-gray-200 text-gray-500'}
        ${touched && Boolean(error) && 'border-0.5 border-error'}
        `}>
          <View
            className={`
          ${Boolean(icon) && 'flex flex-row items-center gap-1'}
          `}>
            {icon}
            <TextInput
              className={`
                text-sm text-black p-0
                ${disabled && 'bg-gray-200 text-gray-600'}
              `}
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              editable={!disabled}
              placeholderTextColor={'#72787F'}
              spellCheck={false}
              autoCorrect={false}
              {...props}
            />
          </View>
          {touched && Boolean(error) && (
            <Typography className="text-error" fontWeight={'MEDIUM'}>
              {error}
            </Typography>
          )}
        </View>
      </Pressable>
    );
  },
);
