import AsyncStorage from "@react-native-async-storage/async-storage";


export const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem("@lastGameData", jsonValue);
        console.log("Stored score data");
        console.log(jsonValue);
    } catch(e){
        console.log(e);
    }
}