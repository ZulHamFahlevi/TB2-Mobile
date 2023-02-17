import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import FormPencarianScreen from './screen/FormPencarianScreen';
import TiketScreen from './screen/TiketScreen';
import HasilPencarianScreen from './screen/HasilPencarianScreen'
import FormPemesananScreen from './screen/FormPemesananScreen'



function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FormPencarianScreen" component={NavigationTab} />
        <Stack.Screen name="TiketScreen" component={TiketScreen} />
        <Stack.Screen name="HasilPencarianScreen" component={HasilPencarianScreen} />
        <Stack.Screen name="FormPemesananScreen" component={FormPemesananScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function NavigationTab() {
  return (
    <Tab.Navigator
      activeColor="white"
      barStyle={{ backgroundColor: '#4B7BE5' }}
    >
      <Tab.Screen
        name="HomeTab"
        component={FormPencarianScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="TiketTab"
        component={TiketScreen}
        options={{
          tabBarLabel: 'Tiket Saya',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="ticket" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default Navigation;