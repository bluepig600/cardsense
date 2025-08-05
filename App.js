import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            return <FontAwesome6 name="house" size={size} color={color} />;
          } else if (route.name === 'My Cards') {
            return <Feather name="credit-card" size={size} color={color} />;
          } else if (route.name === 'Scan Card') {
            return <MaterialCommunityIcons name="credit-card-scan-outline" size={size} color={color} />;
          } 

          // You can return any component that you like here!
          return null;
        },
        tabBarActiveTintColor: '#23844fff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Scan Card" component={ScanCard} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Cards" component={MyCards} />
    </Tab.Navigator>
  );
}

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function ScanCard() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Scan Card</Text>
    </View>
  );
}
function MyCards() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>My Cards</Text>
    </View>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4fff9eff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
