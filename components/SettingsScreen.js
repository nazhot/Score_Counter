import { View, Text, TextInput } from "react-native";
import InputWithLabel from "./InputWithLabel";
import { useGlobalData, useGlobalDataDispatch } from "../data/globalData";
import { StyleSheet } from "react-native";

const inputStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        flex: 1,
        borderColor: "#BFDBF7",
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,

    },
    text: {
        flex: 1,
    }
});

function createSettingsComponents(settings){
    const settingsComponents = [];
    let count = 0;
    for ( const setting in settings ) {
        console.log(setting);
        settingsComponents.push(
            <InputWithLabel
                label={setting}
                value={settings[setting]}
                onChange={(text) => console.log(text)}
                key={count}
                styles={inputStyles}
            />
        );
        count++;
    }

    return settingsComponents;
}


const SettingsScreen = ( { navigation, routes } ) => {

    const globalData = useGlobalData();

    return(
        <View>
            {createSettingsComponents(globalData.themeSettings)}
        </View>
    );
}

export default SettingsScreen;