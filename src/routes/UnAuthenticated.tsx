import React, { memo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomePage } from 'pages/Welcome';
import { LoginPage } from 'pages/Login';

export const UNAUTHENTICATED_STACK = 'UnAuthencatedStack';
export enum UNAUTHENTICATED_STACK_PAGES {
  WELCOME = 'Welcome',
  LOGIN = 'Login',
}

export type UnAuthenticatedStackParamList = {
  [UNAUTHENTICATED_STACK_PAGES.WELCOME]: undefined;
  [UNAUTHENTICATED_STACK_PAGES.LOGIN]: undefined;
};

const Stack = createNativeStackNavigator<UnAuthenticatedStackParamList>();

export const UnAuthenticated = memo((props: { initialPage?: string }) => {
  const initial = (props?.initialPage ||
    UNAUTHENTICATED_STACK_PAGES.WELCOME) as keyof UnAuthenticatedStackParamList;
  return (
    <Stack.Navigator
      initialRouteName={initial}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={UNAUTHENTICATED_STACK_PAGES.WELCOME}
        component={WelcomePage}
      />
      <Stack.Screen
        name={UNAUTHENTICATED_STACK_PAGES.LOGIN}
        component={LoginPage}
      />
    </Stack.Navigator>
  );
});
