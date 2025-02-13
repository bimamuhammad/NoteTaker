import React, {createContext, useContext, useRef} from 'react';
import {BackHandler} from 'react-native';
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
import {savingCache, titleAtom, valueAtom, openedFileAtom} from '../constants';
import {saveContent} from '../util/SaveFile';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {useNavigation} from '@react-navigation/native';

const windowDimensions: ScaledSize = Dimensions.get('window');

function ParentView({children, drawer}): React.JSX.Element {
  const navigation = useNavigation();
  const value = useRecoilState(valueAtom)[0];
  const title = useRecoilState(titleAtom)[0];
  const resetTitle = useResetRecoilState(titleAtom);
  const resetValue = useResetRecoilState(valueAtom);
  const resetInitialOpen = useResetRecoilState(openedFileAtom);
  const [openedFile, setOpenedFile] = useRecoilState(openedFileAtom);

  const ACTIONS = [
    {
      title: 'Menu',
      data: [
        {
          label: 'New',
          action: () => {
            resetTitle();
            resetValue();
            resetInitialOpen();
            drawer.current?.closeDrawer();
          },
        },
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
              saveContent({newtitle: title, oldtitle: openedFile, value});
              setOpenedFile(title);
            } else {
              // alert that null value was passed
            }
            drawer.current?.closeDrawer();
          },
        },
        {
          label: 'Close',
          action: () => {
            BackHandler.exitApp();
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
