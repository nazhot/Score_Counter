import { FontAwesome } from '@expo/vector-icons';
import { React } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#a02",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});

const BottomNav = ( {screens, goToNewGameScreen} ) => {
    return (
        <View
        style={styles.container}
        >
            <Pressable
                onPress={goToNewGameScreen}
            >
                <FontAwesome
                    name="play"
                    size={30}
                    color="#fff"
                />
            </Pressable>
        </View>
    );
};

export default BottomNav;