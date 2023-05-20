import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import NavBar from "./components/NavBar";
import ScoreContainer from './components/ScoreContainer';
import BottomNav from './components/BottomNav';
import { useState } from 'react';

export default function App() {

  const [scoreData, setScoreData] = useState(
    [
      {
        name: "Maddie",
        score: 2,
      },
      {
        name: "Noah",
        score: 1,
      }
    ]
  );

  function updateScoreFunction(index, value) {
    const playerData    = scoreData[index];
    const newScore      = playerData.score + value;
    const newPlayerData = {
      ...playerData,
      score: newScore,
    }

    const newScoreData = [];

    for (let i = 0; i < scoreData.length; i++) {
      if ( i == index ) {
        newScoreData.push(newPlayerData);
      } else {
        newScoreData.push(scoreData[i]);
      }
    }

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
