import { MoimPostStack } from "navigators/constants";
import MoimBoardScreen from "screens/MoimBoardStackScreens/MoimBoardScreen";

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
        </MoimPostStack.Navigator>
    );
}