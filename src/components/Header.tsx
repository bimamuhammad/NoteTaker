import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {titleAtom} from '../constants';
import {useRecoilState} from 'recoil';

const EditableHeader = ({navigation, route, drawer}) => {
  const [titleText, onChangeTitle] = useRecoilState(titleAtom);

  const handleTitleChange = (text: string) => {
    onChangeTitle(text);
    // navigation.setOptions({title: text});
  };
  const moreButton = () => {
    drawer.current?.openDrawer();
  };

  return (
    <View style={styles.headerContainer}>
      <TextInput
        value={titleText}
        onChangeText={handleTitleChange}
        style={styles.titleInput}
      />
      <TouchableOpacity style={styles.button} onPress={moreButton}>
        <Text>More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 5,
    paddingLeft: 5,
    columnGap: 2,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    fontSize: 20,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    height: '50%',
    width: '15%',
  },
});

export default EditableHeader;
