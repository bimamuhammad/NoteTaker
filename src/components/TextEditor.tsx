import React, {useEffect, useRef, useCallback} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {titleAtom, valueAtom} from '../constants';
import {saveContent} from '../util/SaveFile';
import {useRecoilState} from 'recoil';
import {
  RichText,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from '@10play/tentap-editor';
import {logger} from '../util/logger';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const TextEditor = (params: {isEditing?: boolean}) => {
  const [value, onChangeText] = useRecoilState(valueAtom);
  const [titleText, onChangeTitle] = useRecoilState(titleAtom);

  const handleEditorChange = newContent => {
    onChangeText(newContent); // Update Recoil on editor changes
  };
  const editor = useEditorBridge({
    // autofocus: true,
    avoidIosKeyboard: true,
    initialContent: value,
    onChange: () => {
      editor.getHTML().then(text => onChangeText(text));
    },
  });

  const updateStorageAndValue = text => {
    // editor.getText().then(text => {
    logger.info({message: 'Text: ' + text});
    onChangeText(text);
    // });
  };

  // useEffect(() => {
  //   // Will render each time content is updated and call onSave
  //   logger.info({message: 'Text: ' + content});
  //   content && onChangeText(content);
  // }, [content, onChangeText]);

  const quickSave = async () => {
    saveContent({value, title: titleText});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textView} accessibilityRole={'scrollbar'}>
        <RichText editor={editor} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.textInput}>
          <Toolbar editor={editor} hidden={false} />
        </KeyboardAvoidingView>
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
    padding: 5,
    backgroundColor: 'white',
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
    height: '10%',
    textAlignVertical: 'top',
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});

export default TextEditor;
