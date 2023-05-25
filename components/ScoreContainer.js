import { React } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ScoreCard from './ScoreCard';
import { useScoreData, useScoreDataDispatch } from '../data/scoreData';

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
function generateScoreCards(goToPlayerScreen){
    const scoreData         = useScoreData();
    const scoreCards = [];
    for ( const playerData of scoreData ) {
        scoreCards.push(
            <ScoreCard
                name={playerData.name}
                id={playerData.id}
                score={playerData.score}
                key={playerData.id}
                goToPlayerScreen={goToPlayerScreen}
            />
        );
    }
    return scoreCards;
}


const ScoreContainer = ( {goToPlayerScreen} ) => {

    return (
        <View
            style={styles.container}
        >
            {generateScoreCards(goToPlayerScreen)}
        </View>
    );
};

export default ScoreContainer;