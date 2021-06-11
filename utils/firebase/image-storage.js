import { firebase } from "utils/firebase/config";

const getStorageRef = () => firebase.storage().ref();

export const storePhoto = (uid, file) => {
  const storageRef = getStorageRef();
  const imgRef = storageRef.child(`images/${uid}`);
  return imgRef.put(file).then((snap) => {
    return snap.ref.getDownloadURL().then(downloadURL => downloadURL);
  });
};

export const deletePhoto = (uid) => {
  const storageRef = getStorageRef();
  return storageRef.child(`images/${uid}`).delete();
};
