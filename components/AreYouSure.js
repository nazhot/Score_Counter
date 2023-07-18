import { Alert, Pressable, StyleSheet, Text, Touchable } from "react-native";
import { View } from "react-native";


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      height: 200,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  


function AreYouSure( {navigation, route} ){

    let popupDims;

    return(
      <Pressable
        style={styles.centeredView}
        onPress={(event)=> {
          let x = event.nativeEvent.pageX;
          let y = event.nativeEvent.pageY;
          if ( x < popupDims.x || x > ( popupDims.x + popupDims.width )||
               y < popupDims.y || y > ( popupDims.y + popupDims.height ) ) {
            navigation.goBack();
          }
        }}
      >
        <View style={styles.centeredView}>
            <View style={styles.modalView}
                  onLayout={(event) => {
                    popupDims = event.nativeEvent.layout;
                    console.log(popupDims.x);
                  }}  
            >
                <Text style={ { flex: 5 } }>
                    Are you sure?
                </Text>
                <View style={ { flex: 1, flexDirection: "row", columnGap: 20, alignItems: "center", justifyContent: "center" } }>
                  <Pressable
                      onPress={()=> navigation.goBack()}
                      style={ {flex: 1, alignItems: "center"} }
                  >
                      <Text>
                          No
                      </Text>
                  </Pressable>
                  <Pressable
                      onPress={()=> {
                        navigation.goBack();
                        route.params.confirmFunction();
                      }}
                      style={ {flex: 1, alignItems: "center"} }
                  >
                      <Text>
                          Yes
                      </Text>
                  </Pressable>
                </View>

            </View>
        </View>
      </Pressable>
    )
}


export default AreYouSure;