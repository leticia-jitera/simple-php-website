import {
  Authenticated,
  AUTHENTICATED_STACK,
  AUTHENTICATED_PAGES,
} from './Authenticated';
import {
  UnAuthenticated,
  UNAUTHENTICATED_STACK,
  UNAUTHENTICATED_STACK_PAGES,
} from './UnAuthenticated';

export const STACK_NAMES = {
  [AUTHENTICATED_STACK]: AUTHENTICATED_STACK,
  [UNAUTHENTICATED_STACK]: UNAUTHENTICATED_STACK,
};

export const STACK_COMPONENTS = {
  [AUTHENTICATED_STACK]: Authenticated,
  [UNAUTHENTICATED_STACK]: UnAuthenticated,
};

export const STACK_PAGES = {
  [AUTHENTICATED_STACK]: AUTHENTICATED_PAGES,
  [UNAUTHENTICATED_STACK]: UNAUTHENTICATED_STACK_PAGES,
};

export type { AuthenticatedStackParamList } from './Authenticated';
export type { UnAuthenticatedStackParamList } from './UnAuthenticated';
