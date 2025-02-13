import * as RNFS from '@dr.pogodin/react-native-fs';
import {defaultNote} from '../constants';
import {Alert} from 'react-native';
import {logger} from './logger';

export const saveContent = (params: {
  newtitle: string;
  oldtitle?: string;
  value: string;
  isEditing?: boolean;
}) => {
  // Should write the content to a save location
  if (params.newtitle === defaultNote && !params.isEditing) {
    showAlert();
  }

  console.log(`Old File: ${params.oldtitle} ==== New File: ${params.newtitle}`);
  var path = RNFS.DocumentDirectoryPath + '/' + params.newtitle;

  // write the file
  RNFS.writeFile(path, params.value, 'utf8')
    .then(success => {
      console.log(params.value);
      console.log('FILE WRITTEN!');
      if (
        params.newtitle !== params.oldtitle &&
        params.oldtitle !== '' &&
        params.oldtitle !== defaultNote
      ) {
        RNFS.unlink(RNFS.DocumentDirectoryPath + '/' + params.oldtitle)
          .then(() => {
            logger.info({message: 'OLD FILE DELETED'});
          })
          .catch(err => {
            logger.error({message: err.message});
          });
      }
    })
    .catch(err => {
      logger.error({message: err.message});
    });
};

const showAlert = () => {
  Alert.alert('No Name', 'Choose a name', [
    {
      text: 'Cancel',
      onPress: () => logger.info({message: 'Cancel Pressed'}),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => logger.info({message: 'OK Pressed'})},
  ]);
};
