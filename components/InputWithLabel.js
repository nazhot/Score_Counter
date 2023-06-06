import { TextInput, Switch, View, Text } from "react-native";


function getInputComponent(value, onChange, style) {
    switch(typeof value) {
        case "string":
            return (
                <TextInput
                    style={style}
                    onChangeText={onChange}
                    value={value}
                />
            );
        case "number":
            return (
                <TextInput
                    style={style}
                    onChangeText={onChange}
                    value={value}
                    inputMode="numeric"
                />
            );
        case "boolean":
            return (
                <Switch
                style={[style, {borderWidth: 0, padding: 0}]}
                value={value}
                onValueChange={onChange}
                />
            );
        default:
            return;
    }
}


const InputWithLabel = ( {styles, label, value, onChange} ) => {

    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.text}
            >
                {label}
            </Text>
            {getInputComponent(value, onChange, styles.input)}
        </View>
    );

}

export default InputWithLabel;