import { StyleSheet, SafeAreaView } from 'react-native';
import NavBar from "./components/NavBar";
import ScoreContainer from './components/ScoreContainer';
import BottomNav from './components/BottomNav';
import { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScoreScreen from './components/ScoreScreen';
import PlayerScreen from './components/PlayerScreen';
import NewGameScreen from './components/NewGameScreen';
import SettingsScreen from './components/SettingsScreen';
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
              options={ { headerShown: false } }
            />
            <Stack.Screen
              name="Player"
              component={PlayerScreen}
              options={ ( { route } ) => ( { title: route.params.name } ) }
            />
            <Stack.Screen
              name="NewGame"
              component={NewGameScreen}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

