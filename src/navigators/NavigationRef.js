import { createNavigationContainerRef } from '@react-navigation/native'

export const navigationRef = createNavigationContainerRef();

export const navigation = (route) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(route);
  }
}