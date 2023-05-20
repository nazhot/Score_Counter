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
function generateScoreCards(dataObject, updateScoreFunction){
    const scoreCards = [];
    let count = 0;
    for ( const player in dataObject ) {
        scoreCards.push(
            <ScoreCard
                player={player}
                score={dataObject[player].score}
                key={count}
                updateScoreFunction={updateScoreFunction}
            />
        );
        count++;
    }
    return scoreCards;
}


const ScoreContainer = ( {data, updateScoreFunction} ) => {
    return (
        <View
            style={styles.container}
        >
            {generateScoreCards(data, updateScoreFunction)}
        </View>
    );
};

export default ScoreContainer;