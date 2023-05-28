import { React } from 'react';
import { StyleSheet, View } from 'react-native';
import ScoreCard from './ScoreCard';
import { useScoreData } from '../data/scoreData';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#333",
        flex: 9,
    }
});

/**
 * Using the given data, create the ScoreCard components that will be within this ScoreContainer
 * @param {Array} data Array of object that define the various players and their scores
 */
function generateScoreCards(goToPlayerScreen){
    const scoreData  = useScoreData();
    const scoreCards = [];
    if ( scoreData.length === 0 ) {
        return [];
    }

    for ( const playerData of scoreData ) {
        scoreCards.push(
            <ScoreCard
                name={playerData.name}
                id={playerData.id}
                score={playerData.score.toString()}
                key={playerData.id}
                hue={"167"}
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