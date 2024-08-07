import React from "react";
import { MoimPostStack } from "navigators/constants";
import MoimBoardScreen from "screens/MoimBoardStackScreens/MoimBoardScreen";
import MoimPostDetailScreen from "screens/MoimBoardStackScreens/MoimPostDetailScreen";
import MoimPostEditScreen from "screens/MoimBoardStackScreens/MoimPostEditScreen";
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
                    headerTitle: '게시글 작성',
                    headerShown: true,
                }}
            />
            <MoimPostStack.Screen 
                name={'MOIM_POST_EDIT'}
                component={MoimPostEditScreen}
                options={{
                    headerTitle: '게시글 수정',
                    headerShown: true,
                }}
            />
        </MoimPostStack.Navigator>
    );
}