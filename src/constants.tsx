import {atom} from 'recoil';
export const defaultNote = 'NoteTaker';
export const savingCache = {
  title: 'saveTitle',
  value: 'saveValue',
};

export const titleAtom = atom({
  key: 'titleProp',
  default: defaultNote,
});

export const valueAtom = atom({
  key: 'valueProp',
  default: '',
});

export const openedFileAtom = atom({
  key: 'openedFile',
  default: defaultNote,
});
