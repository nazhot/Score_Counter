import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import NavBar from "./components/NavBar";
import ScoreContainer from './components/ScoreContainer';
import BottomNav from './components/BottomNav';

const scoreData = [
  {
    player: "Maddie",
    score: 1,
  },
  {
    player: "Noah",
    score: 2,
  }
];


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        winner="Maddie"
        >
      </NavBar>
      <ScoreContainer
        data={scoreData}
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
