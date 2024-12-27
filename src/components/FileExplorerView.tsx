import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {getFiles} from '../util/GetFiles';

type ItemProps = {
  item: string;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item]}>
    <Text style={[styles.title, {color: '#000000'}]}>{item}</Text>
  </TouchableOpacity>
);

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
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});
