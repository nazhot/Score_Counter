import { StyleSheet, SafeAreaView } from 'react-native';
import NavBar from "./components/NavBar";
import ScoreContainer from './components/ScoreContainer';
import BottomNav from './components/BottomNav';
import { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScoreScreen from './components/ScoreScreen';
import PlayerScreen from './components/PlayerScreen';
import { UserProvider } from './data/scoreData';

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>

            <Stack.Screen
              name="Score"
              component={ScoreScreen}
            />
            <Stack.Screen
              name="Player"
              component={PlayerScreen}
              options={({route}) => ({title: route.params.name})}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

