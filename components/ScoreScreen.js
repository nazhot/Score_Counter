import { StyleSheet, SafeAreaView } from 'react-native';
import NavBar from "./NavBar";
import ScoreContainer from './ScoreContainer';
import BottomNav from './BottomNav';

const ScoreScreen = ( {navigation} ) => {

    const goToPlayerScreen = (id, name) => {
      navigation.navigate("Player", {id, name});
    };

    const goToNewGameScreen = () => {
      navigation.navigate("NewGame");
    };

    return (
        <SafeAreaView style={styles.container}>
        <NavBar navigation={navigation}/>
        <ScoreContainer
          goToPlayerScreen={goToPlayerScreen}
        >
        </ScoreContainer>
        <BottomNav
          goToNewGameScreen={goToNewGameScreen}
        >
        </BottomNav>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  


export default ScoreScreen;