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
function generateScoreCards(dataArray){
    const scoreCards = [];
    let count = 0;
    for ( const data of dataArray ) {
        scoreCards.push(
            <ScoreCard
                player={data.player}
                score={data.score}
                key={count}
            />
        );
        count++;
    }
    return scoreCards;
}


const ScoreContainer = ( {data} ) => {
    return (
        <View
            style={styles.container}
        >
            {generateScoreCards(data)}
        </View>
    );
};

export default ScoreContainer;