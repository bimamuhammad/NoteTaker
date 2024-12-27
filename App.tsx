/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import TextEditor from './src/components/TextEditor';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import ParentView from './src/components/ParentView';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RecoilRoot} from 'recoil';
import FileExplorer from './src/components/FileExplorerView';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <RecoilRoot>
      <NavigationContainer>
        <ParentView>
          {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
          <Stack.Navigator>
            <Stack.Screen
              name="TextEditor"
              component={TextEditor}
              options={{title: 'Text Editor'}}
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
