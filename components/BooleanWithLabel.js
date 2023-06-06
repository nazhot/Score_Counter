import { View, Text, Switch } from "react-native";

const BooleanWithLabel = ( {styles, label, value, setValue} ) => {
    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.text}
            >
                {label}
            </Text>
            <Switch
                style={styles.switch}
                value={value}
                onValueChange={() => setValue(value)}
            />
        </View>
    );
};


export default BooleanWithLabel;