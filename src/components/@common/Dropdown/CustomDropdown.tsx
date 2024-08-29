import {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Typography} from '../Typography/Typography';

interface CustomDropdownProps {
  isPressed: boolean;
  selectedMenu: any;
  placeholder?: string;
  menuList: any[];
  handleSelect: (item: any) => void;
  height?: number;
  onPress: () => void;
}

const CustomDropdown = ({
  isPressed,
  selectedMenu,
  placeholder,
  menuList,
  handleSelect,
  height = 300,
  onPress,
}: CustomDropdownProps) => {
  const dropdownHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(dropdownHeight, {
      toValue: isPressed ? height : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [isPressed]);

  const padding = dropdownHeight.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 12],
  });

  return (
    <View className="flex flex-col">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="flex flex-row border-0.5 border-gray-200 rounded-xl bg-gray-100 p-4">
        <Typography
          fontWeight="MEDIUM"
          className={selectedMenu ? 'text-dark-800' : 'text-gray-500'}>
          {selectedMenu ? selectedMenu.label : placeholder}
        </Typography>
        <Ionicons
          name="chevron-expand"
          style={{marginLeft: 'auto'}}
          size={15}
          color={'#535353'}
        />
      </TouchableOpacity>

      <Animated.View
        style={{
          height: dropdownHeight,
          paddingHorizontal: 12,
          paddingVertical: padding,
        }}
        className="flex flex-col bg-gray-100 rounded-xl pt-0 gap-y-2 mt-2">
        <ScrollView nestedScrollEnabled>
          {menuList.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleSelect(item);
                onPress();
              }}
              className="p-2">
              <Typography fontWeight="MEDIUM" className="text-dark-800 text-sm">
                {item}
              </Typography>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default CustomDropdown;
