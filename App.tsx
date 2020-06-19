import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GearSelectScreen, SurvivorsScreen} from '@screens';
import {store} from '@store';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider as StoreProvider} from 'react-redux';

const Stack = createStackNavigator();
const SurvivorsTab = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SurvivorsScreen"
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

const RootStack = createStackNavigator();

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <RootStack.Navigator mode="modal">
            <RootStack.Screen
              name="Main"
              component={Tabs}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name="GearSelectScreen"
              component={GearSelectScreen.Component}
              options={GearSelectScreen.options}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
};
export default App;
