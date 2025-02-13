import * as RNFS from '@dr.pogodin/react-native-fs';

export const openFile = async (fileName: string) => {
  var path = RNFS.DocumentDirectoryPath + '/' + fileName;

  // getFile List
  return await RNFS.readFile(path).catch(err => {
    console.log(err.message);
    return '';
  });
};
