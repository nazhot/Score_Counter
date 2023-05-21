import { StyleSheet, SafeAreaView } from 'react-native';
import NavBar from "./NavBar";
import ScoreContainer from './ScoreContainer';
import BottomNav from './BottomNav';
import { useState } from 'react';

const ScoreScreen = ( {navigation} ) => {

    const goToPlayerScreen = (player) => {
        navigation.navigate("Player", {name: player});
    }

    const [scoreData, setScoreData] = useState(
        [
          {
            name: "Maddie",
            score: 2,
            increment: 2,
          },
          {
            name: "Noah",
            score: 1,
            increment: 3,
          }
        ]
      );
    
      let winner = "";
      let winnerScore = 0;
      for (let i = 0; i < scoreData.length; i++){
        if (scoreData[i].score > winnerScore){
          winner      = scoreData[i].name;
          winnerScore = scoreData[i].score;
        }
      }
    
      function updateScoreData(index, newPlayerData){
        const newScoreData = [];
        for (let i = 0; i < scoreData.length; i++){
          if (i == index){
            newScoreData.push(newPlayerData);
          } else{
            newScoreData.push(scoreData[i]);
          }
        }
    
        setScoreData(newScoreData);
      }
    
      function updateScoreFunction(index, multiplier) {
        const playerData    = scoreData[index];
        const newScore      = playerData.score + (playerData.increment * multiplier);
        const newPlayerData = {
          ...playerData,
          score: newScore,
        };
    
        updateScoreData(index, newPlayerData);
      }
    
      function updateIncrementFunction(index, newIncrement) {
        const playerDatan   = scoreIndex[index];
        const newPlayerData = {
          ...scoreData,
          increment: newIncrement,
        }
        updateScoreData(index, newPlayerData);
      }
    
      function updateNameFunction(index) {
        const newName       = "just a test";
        const playerData    = scoreData[index];
        const newPlayerData = {
          ...playerData,
          name: newName,
        };
    
        updateScoreData(index, newPlayerData);
      }
    
      function addNewPlayerAtEnd() {
        const newScoreData = [...scoreData];
        newScoreData.push(
          {
            name: "New Player",
            score: 0,
            increment: 1,
          }
        );
    
        setScoreData(newScoreData);
      }

    return (
        <SafeAreaView style={styles.container}>
        <NavBar
          winner={winner}
          addPlayer={addNewPlayerAtEnd}
          >
        </NavBar>
        <ScoreContainer
          data={scoreData}
          updateScoreFunction={updateScoreFunction}
          updateNameFunction={updateNameFunction}
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