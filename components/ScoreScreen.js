import { StyleSheet, SafeAreaView } from 'react-native';
import NavBar from "./NavBar";
import ScoreContainer from './ScoreContainer';
import BottomNav from './BottomNav';
import { useContext, useState } from 'react';
import { useScoreData, useScoreDataDispatch } from '../data/scoreData';

const ScoreScreen = ( {navigation} ) => {
    const scoreData         = useScoreData();
    const scoreDataDispatch = useScoreDataDispatch();

    const goToPlayerScreen = (id, name) => {
        navigation.navigate("Player", {id, name});
    }
    
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
    
      function incrementScoreFunction(index, multiplier) {
        const playerData    = scoreData[index];
        const newScore      = playerData.score + (playerData.increment * multiplier);
        const newPlayerData = {
          ...playerData,
          score: newScore,
        };
    
        updateScoreData(index, newPlayerData);
      }

      function updateScoreFunction(index, newScore) {
        const playerData = scoreData[index];
        const newPlayerData = {
          ...playerData,
          score: newScore,
        };

        updateScoreData(index, newPlayerData);
      }
    
      function updateIncrementFunction(index, newIncrement) {
        const playerData   = scoreData[index];
        const newPlayerData = {
          ...playerData,
          increment: newIncrement,
        }
        updateScoreData(index, newPlayerData);
      }
    
      function updateNameFunction(index, newName) {
        //const newName       = "just a test";
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
          incrementScoreFunction={incrementScoreFunction}
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