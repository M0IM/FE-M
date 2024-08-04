import React, { useEffect, useRef } from 'react';
import { Animated, View, Pressable, FlatList, Platform } from 'react-native';
import { Typography } from 'components/@common/Typography/Typography';
import { cva } from 'class-variance-authority';
import { cn } from 'utils';

type MenuType = {
    id: number;
    title: string;
    onPress: Function;
}

interface PopoverMenuProps {
    isPopover?: boolean;
    menu: MenuType[];
}

const PopoverMenu = ({
    isPopover,
    menu,
}: PopoverMenuProps) => {
    const platform = Platform.OS;
    const opacity = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: isPopover ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();

        Animated.timing(scale, {
            toValue: isPopover ? 1 : 0.8,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isPopover]);

    if (!isPopover) {
        return null;
    }

    return (
        <Animated.View
            style={{
                opacity,
                transform: [{ scale }],
            }}
        >
            <View className={cn(PopoverVariant({platform}))}>
                <FlatList 
                    data={menu}
                    renderItem={({item}) => (
                        <Pressable onPress={() => item.onPress()} className='active:bg-gray-100 p-[5px] pl-[10px] pr-[10px] rounded-lg'>
                            <Typography fontWeight='MEDIUM' className='text-base text-dark-800'>{item.title}</Typography>
                        </Pressable>
                    )}
                    ItemSeparatorComponent={() => <View className='h-1' />}
                />
            </View>
        </Animated.View>
    );
};

const PopoverVariant = cva('flex flex-col rounded-2xl p-3 bg-white', {
    variants: {
        platform: {
            ios: 'shadow-md shadow-gray-200',
            android: 'elevation-lg shadow-gray-400',
            windows: 'shadow-md shadow-gray-200',
            macos: 'shadow-md shadow-gray-200',
            web: 'shadow-md shadow-gray-200'
          }
    }
});

export default PopoverMenu;
