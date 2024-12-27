import * as RNFS from '@dr.pogodin/react-native-fs';
import {defaultNote} from '../constants';
import {Alert} from 'react-native';

export const saveContent = (params: {
  title: string;
  value: string;
  isEditing?: boolean;
}) => {
  // Should write the content to a save location
  if (params.title === defaultNote && !params.isEditing) {
    showAlert();
  }
  var path = RNFS.DocumentDirectoryPath + '/' + params.title + '.txt';

  // write the file
  RNFS.writeFile(path, params.value, 'utf8')
    .then(success => {
      console.log('FILE WRITTEN!');
    })
    .catch(err => {
      console.log(err.message);
    });
};

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
