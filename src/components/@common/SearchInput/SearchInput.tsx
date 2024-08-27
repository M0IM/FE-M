import {TextInput, TextInputProps, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';

interface ISearchInputProps extends TextInputProps {
  onSubmit?: () => void;
}

export function SearchInput({onSubmit, ...props}: ISearchInputProps) {
  return (
    <View className="flex-row  bg-gray-100 items-center justify-between border border-black px-2 py-3 rounded-3xl">
      <TextInput
        className="flex-1 text-sm pl-0 px-0 color-black"
        autoCapitalize="none"
        placeholderTextColor={'gray'}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        clearButtonMode="while-editing"
        {...props}
      />
      <IonIcons name={'search'} color={'black'} size={28} onPress={onSubmit} />
    </View>
  );
}
