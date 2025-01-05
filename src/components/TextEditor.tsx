import React, {useState, useContext} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {titleAtom, valueAtom} from '../constants';
import {saveContent} from '../util/SaveFile';
import {useRecoilState} from 'recoil';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const TextEditor = (params: {isEditing?: boolean}) => {
  const [value, onChangeText] = useRecoilState(valueAtom);
  const [titleText, onChangeTitle] = useRecoilState(titleAtom);

  const updateStorageAndValue = (text: string) => {
    onChangeText(text);
  };

  const quickSave = async () => {
    saveContent({value, title: titleText});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textView} accessibilityRole={'scrollbar'}>
        <TextInput
          editable
          multiline={true}
          numberOfLines={500}
          maxLength={5000}
          onChangeText={text => updateStorageAndValue(text)}
          // onEndEditing={saveContent}
          value={value}
          style={styles.textInput}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5,
    columnGap: 2,
    // fontFamily: 'Cochin',
    // height: '5%',
    // flex: 0.25,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '70%',
  },
  textView: {
    height: '90%',
    flex: 1,
  },
  button: {
    fontSize: 20,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height: '50%',
    width: '15%',
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    height: '100%',
    textAlignVertical: 'top',
  },
});

export default TextEditor;
