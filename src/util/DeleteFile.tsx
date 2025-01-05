import * as RNFS from '@dr.pogodin/react-native-fs';
import {useRecoilState} from 'recoil';

export const deleteFile = async (fileName: string) => {
  var path = RNFS.DocumentDirectoryPath + '/' + fileName;

  // getFile List
  return await RNFS.unlink(path).catch(err => {
    console.log(err.message);
    return '';
  });
};
