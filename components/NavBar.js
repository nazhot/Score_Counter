import { React } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "#aaa",
        flex: 1,
        alignContent: "center",
    },
    text: {
        position: "absolute",
        color: "#000",
        bottom: 0,
    }
});

const NavBar = ( {winner} ) => {
    return (
        <View
        style={styles.navbar}
        >
            <Text style={styles.text}>{winner}</Text>
        </View>
    );
};


export default NavBar;