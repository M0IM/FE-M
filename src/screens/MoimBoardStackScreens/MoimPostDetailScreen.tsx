import { View, Text } from 'react-native';

interface MoimPostDetailScreenProps {
    route: any
}

const MoimPostDetailScreen = ({route}: MoimPostDetailScreenProps) => {
    const postId = route.params.id;
    console.log('postId: ', postId);
    return (
        <View>
            <Text>MoimPostDetailScreen</Text>
        </View>
    );
};

export default MoimPostDetailScreen;