import React, { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from 'components/atoms/BottomTabBar';
import { HomePage } from 'pages/Home';
import { SettingPage } from 'pages/Setting';

export const AUTHENTICATED_STACK = 'AuthenticatedStack';
export enum AUTHENTICATED_PAGES {
  HOME_FLOW = 'HomeFlow',
  SETTING_FLOW = 'SettingFlow',
  HOME = 'Home',
  SETTINGS = 'Settings',
}

export type AuthenticatedStackParamList = {
  [AUTHENTICATED_PAGES.HOME]: { isMainFlow?: boolean };
  [AUTHENTICATED_PAGES.SETTINGS]: undefined;
};

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator<AuthenticatedStackParamList>();
const SettingStack = createNativeStackNavigator<AuthenticatedStackParamList>();

export const HomeStackComponent = memo((props: { initialPage?: string }) => {
  const initial = (props?.initialPage ||
    AUTHENTICATED_PAGES.HOME) as keyof AuthenticatedStackParamList;
  return (
    <HomeStack.Navigator
      initialRouteName={initial}
      screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name={AUTHENTICATED_PAGES.HOME}
        initialParams={{ isMainFlow: true }}
        component={HomePage}
      />
    </HomeStack.Navigator>
  );
});

export const SettingStackComponent = memo((props: { initialPage?: string }) => {
  const initial = (props?.initialPage ||
    AUTHENTICATED_PAGES.SETTINGS) as keyof AuthenticatedStackParamList;
  return (
    <SettingStack.Navigator
      initialRouteName={initial}
      screenOptions={{ headerShown: false }}>
      <SettingStack.Screen
        name={AUTHENTICATED_PAGES.SETTINGS}
        component={SettingPage}
      />
    </SettingStack.Navigator>
  );
});

export const Authenticated = memo((props: { initialPage?: string }) => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
      })}>
      <Tab.Screen name={AUTHENTICATED_PAGES.HOME_FLOW}>
        {navigation => (
          <HomeStackComponent {...navigation} initialPage={props.initialPage} />
        )}
      </Tab.Screen>
      <Tab.Screen name={AUTHENTICATED_PAGES.SETTING_FLOW}>
        {navigation => (
          <SettingStackComponent
            {...navigation}
            initialPage={props.initialPage}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
});
