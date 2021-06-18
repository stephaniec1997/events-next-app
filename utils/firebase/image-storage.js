import { firebase } from "utils/firebase/config";

const storage = firebase.storage();

export const storePhoto = (uid, file) => {
  const imgRef = storage.ref().child(`images/${uid}`);
  return imgRef.put(file).then((snap) => {
    return snap.ref.getDownloadURL().then(downloadURL => downloadURL);
  });
};

export const deletePhoto = (uid) => {
  return storage
    .ref()
    .child(`images/${uid}`)
    .delete();
};
