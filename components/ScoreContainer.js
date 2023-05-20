import { React } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ScoreCard from './ScoreCard';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#0a7",
        flex: 9,
    }
});

/**
 * Using the given data, create the ScoreCard components that will be within this ScoreContainer
 * @param {Array} data Array of object that define the various players and their scores
 */
function generateScoreCards(dataObject, updateScoreFunction, updateNameFunction){
    const scoreCards = [];
    let count = 0;
    for ( const playerData of dataObject ) {
        scoreCards.push(
            <ScoreCard
                player={playerData.name}
                score={playerData.score}
                pos={count}
                key={count}
                updateScoreFunction={updateScoreFunction}
                updateNameFunction={updateNameFunction}
            />
        );
        count++;
    }
    return scoreCards;
}


const ScoreContainer = ( {data, updateScoreFunction, updateNameFunction} ) => {
    return (
        <View
            style={styles.container}
        >
            {generateScoreCards(data, updateScoreFunction, updateNameFunction)}
        </View>
    );
};

export default ScoreContainer;