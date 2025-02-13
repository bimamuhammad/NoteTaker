/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useCallback} from 'react';
import type {PropsWithChildren} from 'react';
import TextEditor from './src/components/TextEditor';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  DrawerLayoutAndroid,
} from 'react-native';
import ParentView from './src/components/ParentView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RecoilRoot} from 'recoil';
import FileExplorer from './src/components/FileExplorerView';
import EditableHeader from './src/components/Header';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const drawer = useRef<DrawerLayoutAndroid>(null);

  return (
    <RecoilRoot>
      <NavigationContainer>
        <ParentView drawer={drawer}>
          {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
          <Stack.Navigator
            initialRouteName="TextEditor"
            screenOptions={
              {
                // headerStyle: {
                //   backgroundColor: '#f4511e',
                // },
                // headerTintColor: '#fff',
                // headerTitleStyle: {
                //   fontWeight: 'bold',
                // },
              }
            }>
            <Stack.Screen
              name="TextEditor"
              component={TextEditor}
              options={{
                // title: 'Text Editor',
                headerBackVisible: false,
                header: prop => <EditableHeader drawer={drawer} />,
                // headerTitle: prop => <EditableHeader drawer={drawer} />,
              }}
            />
            <Stack.Screen
              name="FileExplorer"
              component={FileExplorer}
              options={{title: 'File Explorer'}}
            />
          </Stack.Navigator>
        </ParentView>
      </NavigationContainer>
    </RecoilRoot>
  );
}
//  https://github.com/oblador/react-native-vector-icons/tree/master/packages
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
});

export default App;
