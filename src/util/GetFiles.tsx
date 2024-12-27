import * as RNFS from '@dr.pogodin/react-native-fs';

export const getFiles = async () => {
  // Should write the content to a save location
  var path = RNFS.DocumentDirectoryPath;

  // getFile List
  return await RNFS.readDir(path)
    .then(data => {
      return data.map(item => item.name);
    })
    .catch(err => {
      console.log(err.message);
      return [];
    });
};
