/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import TextEditor from './src/components/TextEditor';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TextEditor />
    </SafeAreaView>
  );
}
//  https://github.com/oblador/react-native-vector-icons/tree/master/packages
const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
  },
});

export default App;
