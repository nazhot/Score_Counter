import { React } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ScoreCard from './ScoreCard';
import { useScoreData } from '../data/scoreData';
import DraggableFlatList from 'react-native-draggable-flatlist';

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
function generateScoreCards(scoreData, goToPlayerScreen){
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
                flattened={scoreData.length > 5}
                goToPlayerScreen={goToPlayerScreen}
            />
        );
    }
    return scoreCards;
}


const ScoreContainer = ( {goToPlayerScreen} ) => {
    const scoreData = useScoreData();

    const showFlattened = scoreData.length > 5;

    if (showFlattened){
        return (
            <View 
                style={styles.container}
            >
                <FlatList
                    data={scoreData}
                    renderItem={ ({item}) => (
                        <ScoreCard
                            name={item.name}
                            id={item.id}
                            score={item.score.toString()}
                            key={item.id}
                            flattened={true}
                            goToPlayerScreen={goToPlayerScreen}
                        />
                    )}
                />
            </View>
    
        );
    }

    return (
        <View
            style={styles.container}
        >
            {generateScoreCards(scoreData, goToPlayerScreen)}
        </View>
    );


};

export default ScoreContainer;