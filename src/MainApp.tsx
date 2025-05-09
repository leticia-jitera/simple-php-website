import React, {useEffect, useMemo, useState} from 'react';
import BootSplash from 'react-native-bootsplash';
import {STACK_COMPONENTS, STACK_NAMES} from 'routes';
import {useAppInit} from 'services/common/useAppInit';
import {useAuthenticationData} from 'services/authentication';

export function MainApp() {
  const [initalStack, setInitialStack] = useState<string>();
  const {common, init: appInit} = useAppInit();
  const {init: authenticationInit} = useAuthenticationData(state => {
    if (state.isAuthenticated()) {
      setInitialStack(STACK_NAMES.AuthenticatedStack);
    } else {
      setInitialStack(STACK_NAMES.UnAuthencatedStack);
    }
  });
  useEffect(() => {
    const init = async () => {
      // Add any other init logic here
      await appInit();
      await authenticationInit();
    };

    init().finally(async () => {
      await BootSplash.hide({fade: true});
    });
  }, [appInit, authenticationInit]);

  const component = useMemo(() => {
    // Do not render anything until the initial stack is determined
    if (!initalStack) {
      return null;
    }

    let Component: React.MemoExoticComponent<
      (props: {initialPage?: string | undefined}) => React.JSX.Element
    > | null = null;
    // TODO: implement split if needed
    switch (initalStack) {
      case STACK_NAMES.AuthenticatedStack:
        Component = STACK_COMPONENTS.AuthenticatedStack;
        break;
      case STACK_NAMES.UnAuthencatedStack:
        Component = STACK_COMPONENTS.UnAuthencatedStack;
        break;
    }

    if (!Component) {
      return null;
    }

    // Pass the initial page if needed
    return <Component key={common.language} initialPage={''} />;
  }, [initalStack, common.language]);

  return component;
}
