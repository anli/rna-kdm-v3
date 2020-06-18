import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SurvivorsScreen} from '@screens';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
const SurvivorsTab = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeScreen"
      component={SurvivorsScreen.Component}
      options={SurvivorsScreen.options}
    />
  </Stack.Navigator>
);
const WHITE_BACKGROUND_STYLE = {backgroundColor: '#fff'};
const Tab = createMaterialBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="SurvivorsTab"
      labeled={false}
      activeColor="#000"
      barStyle={WHITE_BACKGROUND_STYLE}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="human" color={color} size={24} />
          ),
        }}
        name="SurvivorsTab"
        component={SurvivorsTab}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </PaperProvider>
  );
};
export default App;
