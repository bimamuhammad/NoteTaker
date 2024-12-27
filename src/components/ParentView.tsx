import React, {createContext, useContext, useRef, useState} from 'react';
import {
  DrawerLayoutAndroid,
  Platform,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  ScaledSize,
  StyleSheet,
  SectionList,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {savingCache, titleAtom, valueAtom} from '../constants';
import {saveContent} from '../util/SaveFile';
import {useRecoilState} from 'recoil';
import {useNavigation} from '@react-navigation/native';

const windowDimensions: ScaledSize = Dimensions.get('window');

function ParentView({children}): React.JSX.Element {
  const navigation = useNavigation();
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const value = useRecoilState(valueAtom)[0];
  const title = useRecoilState(titleAtom)[0];

  const ACTIONS = [
    {
      title: 'Menu',
      data: [
        {
          label: 'File Explorer',
          action: () => {
            // Open file explorer
            navigation.navigate('FileExplorer');

            drawer.current?.closeDrawer();
          },
        },
        {
          label: 'Save',
          action: () => {
            if (value !== null && title !== null) {
              saveContent({title, value});
            } else {
              // alert that null value was passed
            }
            drawer.current?.closeDrawer();
          },
        },
        {
          label: 'Close',
          action: () => {
            drawer.current?.closeDrawer();
          },
        },
      ],
    },
  ];

  if (Platform.OS === 'ios') {
    return <SafeAreaView>{children}</SafeAreaView>;
  } else {
    const navigationView = () => (
      <View style={[styles.container, styles.navigationContainer]}>
        <SectionList
          sections={ACTIONS}
          keyExtractor={(item, index) => item.label + index}
          style={styles.list}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.button} onPress={item.action}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
    );

    return (
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={windowDimensions.width * 0.5}
        drawerPosition="left"
        renderNavigationView={navigationView}>
        {children}
      </DrawerLayoutAndroid>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontWeight: 'bold',
  },
  list: {
    width: '90%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 2,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default ParentView;
