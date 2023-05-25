import { StyleSheet, SafeAreaView } from 'react-native';
import NavBar from "./NavBar";
import ScoreContainer from './ScoreContainer';
import BottomNav from './BottomNav';

const ScoreScreen = ( {navigation} ) => {

    const goToPlayerScreen = (id, name) => {
        navigation.navigate("Player", {id, name});
    }

    return (
        <SafeAreaView style={styles.container}>
        <NavBar/>
        <ScoreContainer
          goToPlayerScreen={goToPlayerScreen}
        >
        </ScoreContainer>
        <BottomNav>

        </BottomNav>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0a',
    },
  });
  


export default ScoreScreen;