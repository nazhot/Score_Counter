import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import NavBar from "./components/NavBar";
import ScoreContainer from './components/ScoreContainer';
import BottomNav from './components/BottomNav';
import { useState } from 'react';

const scoreData = [

];


export default function App() {

  const [scoreData, setScoreData] = useState(
    {
      "Maddie": {
        score: 1,
      },
      "Noah": {
        score: 2,
      }
    }
  );

  function updateScoreFunction(player, value) {
    const playerData    = scoreData[player];
    const newScore      = playerData.score + value;
    const newPlayerData = {
      ...playerData,
      score: newScore,
    }

    const newScoreData = {...scoreData}
    newScoreData[player] = newPlayerData;

    setScoreData(newScoreData);
  }


  return (
    <SafeAreaView style={styles.container}>
      <NavBar
        winner="Maddie"
        >
      </NavBar>
      <ScoreContainer
        data={scoreData}
        updateScoreFunction={updateScoreFunction}
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
