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
function generateScoreCards(dataObject, incrementScoreFunction, updateNameFunction, goToPlayerScreen){
    const scoreCards = [];
    let count = 0;
    for ( const playerData of dataObject ) {
        scoreCards.push(
            <ScoreCard
                player={playerData.name}
                score={playerData.score}
                index={count}
                key={count}
                incrementScoreFunction={incrementScoreFunction}
                updateNameFunction={updateNameFunction}
                goToPlayerScreen={goToPlayerScreen}
            />
        );
        count++;
    }
    return scoreCards;
}


const ScoreContainer = ( {data, incrementScoreFunction, updateNameFunction, goToPlayerScreen} ) => {
    return (
        <View
            style={styles.container}
        >
            {generateScoreCards(data, incrementScoreFunction, updateNameFunction, goToPlayerScreen)}
        </View>
    );
};

export default ScoreContainer;