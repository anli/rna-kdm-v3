import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GearSelectScreen, SettlementScreen, SurvivorsScreen} from '@screens';
import {store} from '@store';
import React from 'react';
import 'react-native-gesture-handler';
import {Provider as PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider as StoreProvider} from 'react-redux';

const TopTabNavigation = createMaterialTopTabNavigator();

const slices = ['survivor1', 'survivor2', 'survivor3', 'survivor4'];

const getTopTab = (Navigator: any, slice: string, name: string) => {
  return (
    <Navigator.Screen
      key={slice}
      options={{
        tabBarTestID: `${slice}TopTab`,
      }}
      name={name}
      component={SurvivorsScreen.Component}
      initialParams={{slice}}
    />
  );
};
const TopTabs = () => {
  return (
    <TopTabNavigation.Navigator>
      {slices.map((slice, index) =>
        getTopTab(TopTabNavigation, slice, String(index + 1)),
      )}
    </TopTabNavigation.Navigator>
  );
};

const SurvivorsTabStack = createStackNavigator();
const SurvivorsTab = () => (
  <SurvivorsTabStack.Navigator>
    <SurvivorsTabStack.Screen
      name="SurvivorsScreen"
      component={TopTabs}
      options={SurvivorsScreen.options}
    />
  </SurvivorsTabStack.Navigator>
);
const SettlementTabStack = createStackNavigator();
const SettlementTab = () => (
  <SettlementTabStack.Navigator>
    <SettlementTabStack.Screen
      name="SettlementScreen"
      component={SettlementScreen.Component}
      options={SurvivorsScreen.options}
    />
  </SettlementTabStack.Navigator>
);
const WHITE_BACKGROUND_STYLE = {backgroundColor: '#fff'};
const Tab = createMaterialBottomTabNavigator();
const getTabBarIcon = (icon: string) => ({color}: any) => (
  <Icon name={icon} color={color} size={24} />
);
const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="SettlementTab"
      labeled={false}
      activeColor="#000"
      barStyle={WHITE_BACKGROUND_STYLE}>
      <Tab.Screen
        options={{
          tabBarIcon: getTabBarIcon('fireplace'),
          tabBarTestID: 'SettlementBottomTab',
        }}
        name="SettlementTab"
        component={SettlementTab}
      />
      <Tab.Screen
        options={{
          tabBarIcon: getTabBarIcon('human'),
          tabBarTestID: 'SurvivorsBottomTab',
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
