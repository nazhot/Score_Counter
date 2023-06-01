import { TextInput, View, Text } from "react-native";

const InputWithLabel = ( {styles, label, text, onTextChange} ) => {

    return (
        <View
            style={styles.container}
        >
            <TextInput
                style={styles.input}
                onChangeText={onTextChange}
                value={text.toString()}
            />
            <Text
                style={styles.text}
            >
                {label}
            </Text>
        </View>
    );

}

export default InputWithLabel;