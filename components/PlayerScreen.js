import { StyleSheet, View, SafeAreaView, Text } from 'react-native';

const PlayerScreen = ( {navigation, route}) => {
    return(
        <View style={{flex: 1, backgroundColor: "#f1f"}}>
            <Text>{route.params.name}</Text>
        </View>
    );

};


export default PlayerScreen;