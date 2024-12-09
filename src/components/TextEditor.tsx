import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as RNFS from '@dr.pogodin/react-native-fs';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const showAlert = () => {
  Alert.alert('No Name', 'Choose a name', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ]);
};

const TextEditor = (params: {isEditing: boolean}) => {
  const defaultNote = 'Note Taker';
  const [value, onChangeText] = React.useState('Useless Multiline Placeholder');
  const [titleText, onChangeTitle] = useState(defaultNote);
  const saveContent = () => {
    // Should write the content to a save location
    if (titleText === defaultNote && !params.isEditing) {
      showAlert();
    }
    var path = RNFS.DocumentDirectoryPath + '/' + titleText + '.txt';

    // write the file
    RNFS.writeFile(path, value, 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!');
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleView}>
        <TextInput
          style={styles.titleText}
          selectTextOnFocus={true}
          value={titleText}
          onChangeText={text => onChangeTitle(text)}
        />
        <TouchableOpacity style={styles.button} onPress={saveContent}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textView} accessibilityRole={'scrollbar'}>
        <TextInput
          editable
          multiline={true}
          numberOfLines={500}
          maxLength={5000}
          onChangeText={text => onChangeText(text)}
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
    // fontFamily: 'Cochin',
    // height: '5%',
    // flex: 0.25,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '85%',
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
