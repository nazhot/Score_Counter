import { React } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

const NavBar = ( {winner} ) => {
    return (
        <SafeAreaView
        style={styles.navbar}
        >
            <Text style={styles.text}>{winner}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    navbar: {
        position: "absolute",
        top: 0,
        backgroundColor: "#000",
        justifyContent: "center",
        flex: 1,
    },
    text: {
        color: "#fff",
    }
});

export default NavBar;