import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import Details from './screens/Details';
import Home from './screens/Home';

const Stack = createStackNavigator();
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

const App = () => {
  const [loaded] = useFonts({
    interBold: require('./assets/fonts/Inter-Bold.ttf'),
    interSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
    interMedium: require('./assets/fonts/Inter-Medium.ttf'),
    interRegular: require('./assets/fonts/Inter-Regular.ttf'),
    interLight: require('./assets/fonts/Inter-Light.ttf'),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screeOptions={{ hearderShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Deatils" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
