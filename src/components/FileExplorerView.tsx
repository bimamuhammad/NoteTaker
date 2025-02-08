import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {getFiles} from '../util/GetFiles';
import {valueAtom, titleAtom, openedFileAtom} from '../constants';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {openFile} from '../util/OpenFile';
import {deleteFile} from '../util/DeleteFile';
import {useNavigation} from '@react-navigation/native';

type ItemProps = {
  item: string;
  onPress: () => void;
};

const Item = ({item, onPress}: ItemProps) => {
  const navigation = useNavigation();
  const [, setValue] = useRecoilState(valueAtom);
  const [titleText, setTitle] = useRecoilState(titleAtom);
  const [, setOpenedFile] = useRecoilState(openedFileAtom);
  const resetTitle = useResetRecoilState(titleAtom);
  const resetValue = useResetRecoilState(valueAtom);
  let openLatch = useRef(false);

  const handleFileSelect = (filename: string) => {
    console.log('File selected: ', filename);
    openLatch.current = true;
    setTitle(filename);
    navigation.navigate('TextEditor');
  };

  const handleFileDelete = (filename: string) => {
    deleteFile(filename);
    navigation.navigate('TextEditor');
    console.log('File deleted: ', filename);
    if (filename === titleText) {
      resetTitle();
      // resetValue();
    }
  };

  useEffect(() => {
    const FetchData = async () => {
      if (!openLatch.current) {
        return;
      }
      const text = await openFile(titleText);
      if (typeof text === 'string' && text !== '') {
        setValue(text);
        setOpenedFile(titleText);
        openLatch.current = false;
      }
    };
    FetchData();
  }, [titleText]);

  return (
    <TouchableOpacity onPress={onPress} style={styles.fileItem}>
      <Text style={styles.fileItemText}>{item}</Text>
      <View style={styles.fileItemButtonContainer}>
        <TouchableOpacity onPress={() => handleFileSelect(item)}>
          <Text style={styles.openButton}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFileDelete(item)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const FileExplorer = () => {
  const [files, setFiles] = useState(['']); //getFiles();
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    getFiles().then(data => {
      setFiles(data);
    });
  }, []);

  if (
    (Array.isArray(files) && files.length === 0) ||
    files === null ||
    files === undefined
  ) {
    return (
      <View>
        <Text> No files found </Text>
      </View>
    );
  }

  const renderItem = (params: {item: string}) => {
    //   const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    //   const color = item.id === selectedId ? 'white' : 'black';
    const item = params.item;

    return <Item item={item} onPress={() => setSelectedId(item)} />;
  };
  return (
    <View>
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={item => item}
        extraData={selectedId}
      />
    </View>
  );
};
export default FileExplorer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  fileItem: {
    // marginVertical: 4,
    // marginHorizontal: 8,
    // paddingLeft: 8,
    padding: 8,
    backgroundColor: '#f9c2ff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  fileItemText: {
    fontSize: 16,
  },
  fileItemButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  openButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
  },
});
