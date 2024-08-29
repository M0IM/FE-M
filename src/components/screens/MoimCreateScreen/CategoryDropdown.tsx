import { useEffect, useRef } from 'react';
import { Animated, Easing, ScrollView, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Typography } from 'components/@common/Typography/Typography';

interface CategoryDropdownProps extends TouchableOpacityProps {
    isPressed: boolean;
    menuList: string[];
    handleSelect: Function;
    selectedMenu: string;
    placeholder?: string;
}

const CategoryDropdown = ({
    isPressed,
    menuList,
    handleSelect,
    selectedMenu,
    placeholder,
    ...props
}: CategoryDropdownProps) => {
    const dropdownHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(dropdownHeight, {
            toValue: isPressed ? 300 : 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: false,
        }).start();
    }, [isPressed]);

    const padding = dropdownHeight.interpolate({
        inputRange: [0, 400],
        outputRange: [0, 12],
    });
    
    return (
        <View className='flex flex-col'>
            <Typography fontWeight={'MEDIUM'} className='text-sm text-gray-500 mb-2'>
                카테고리
            </Typography>
            <TouchableOpacity
                {...props}
                activeOpacity={0.8} 
                className='flex flex-row border-0.5 border-gray-100 rounded-xl bg-gray-100 p-4 mb-4'
            >
                <Typography 
                    fontWeight='MEDIUM' 
                    className={selectedMenu ? 'text-dark-800' : 'text-gray-500'}
                >
                    {selectedMenu ? selectedMenu : placeholder }
                </Typography>
                <Ionicons name="chevron-down" style={{marginLeft: 'auto'}} size={15} color={'#535353'} />
            </TouchableOpacity>

            <Animated.View 
                style={{ height: dropdownHeight, paddingHorizontal: 12, paddingVertical: padding }}
                className='flex flex-col bg-gray-100 rounded-xl pt-0 gap-y-2'
            >
                <ScrollView nestedScrollEnabled>
                    {menuList.map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => handleSelect(item)} className='p-2'>
                            <Typography fontWeight='MEDIUM' className='text-dark-800 text-sm'>{item}</Typography>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>
        </View>
    );
};

export default CategoryDropdown;