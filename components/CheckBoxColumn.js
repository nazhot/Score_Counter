import { useState } from "react";
import { Pressable, View } from "react-native";


function setCheckBoxes( checked, setChecked ){
    const checkBoxes = []
    for ( const index in checked ) {
        const isChecked = checked[index];
        checkBoxes.push(
            <Pressable 
                style={{flex: 1, alignItems: "center", justifyContent: "center", padding: 10}}
                id={index}
            >
                <View style={{flex: 1, borderColor: "black", borderWidth: 1, borderRadius: 1000, backgroundColor: "red", aspectRatio: 1}}>

                </View>
            </Pressable>
        )
    }
    return checkBoxes;
}

const CheckBoxColumn = ( {number} ) => {

    const [checked, setChecked] = useState([false, false, false]);

    return(
        <View style={{flex: 1}}>
            {setCheckBoxes(checked, setChecked)}
        </View>
    )

};


export default CheckBoxColumn;