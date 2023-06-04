import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScoreScreen from './components/ScoreScreen';
import PlayerScreen from './components/PlayerScreen';
import NewGameScreen from './components/NewGameScreen';
import SettingsScreen from './components/SettingsScreen';
import { UserProvider } from './data/scoreData';
import AreYouSure from './components/AreYouSure';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group>
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
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: "transparentModal"}}>
            <Stack.Screen
              name="AreYouSure"
              component={AreYouSure}
              options={ ({ route } ) => ( { headerShown: false } ) }
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

