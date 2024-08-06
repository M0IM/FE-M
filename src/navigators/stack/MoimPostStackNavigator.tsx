import { MoimPostStack } from "navigators/constants";
import React from "react";
import MoimBoardScreen from "screens/MoimBoardStackScreens/MoimBoardScreen";
import MoimPostDetailScreen from "screens/MoimBoardStackScreens/MoimPostDetailScreen";
import MoimPostWriteScreen from "screens/MoimBoardStackScreens/MoimPostWriteScreen";

export default function MoimPostStackNavigator() {
    return (
        <MoimPostStack.Navigator
            initialRouteName={'MOIM_BOARD_HOME'}
            screenOptions={{
                cardStyle: {
                    backgroundColor: 'white',
                },
                headerShown: false,
            }}
        >
            <MoimPostStack.Screen name={'MOIM_BOARD_HOME'} component={MoimBoardScreen} />
            <MoimPostStack.Screen 
                name={'MOIM_POST_DETAIL'} 
                component={MoimPostDetailScreen}
                options={{
                    headerTitle: '게시글',
                    headerShown: true,
                }}
            />
            <MoimPostStack.Screen 
                name={'MOIM_POST_WRITE'}
                component={MoimPostWriteScreen}
                options={{
                    headerTitle: '글쓰기',
                    headerShown: true,
                }}
            />
        </MoimPostStack.Navigator>
    );
}