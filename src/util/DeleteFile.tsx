import * as RNFS from '@dr.pogodin/react-native-fs';

export const deleteFile = async (fileName: string) => {
  var path = RNFS.DocumentDirectoryPath + '/' + fileName;

  // getFile List
  return await RNFS.unlink(path).catch(err => {
    console.log(err.message);
    return '';
  });
};
