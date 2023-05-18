import { React } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: "#aaa",
        flex: 1,
        flexDirection: "row",
    },
    text: {
        color: "#000",
        flex: 2,
    },
    spacer: {
        flex: 4,
        backgroundColor: "red",
    },
    icons: {
        flex: 3,
    }
});

const NavBar = ( {winner} ) => {
    return (
        <View
        style={styles.navbar}
        >
            <Text style={styles.text}>{winner}</Text>
            <View style={styles.spacer}></View>
            <View style={styles.icons}>

            </View>
        </View>
    );
};


export default NavBar;