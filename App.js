import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import NavBar from "./components/NavBar";
import ScoreContainer from './components/ScoreContainer';
import BottomNav from './components/BottomNav';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        winner="Maddie"
        >
      </NavBar>
      <ScoreContainer>

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
