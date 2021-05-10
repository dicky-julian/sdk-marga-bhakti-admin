import { fireAuth, fireDatabase } from "../firebase";
import { fetchResponse } from "../helpers";

const reference = "/user";

export const getUserByKey = (key, value) => {
  return new Promise((resolve, reject) => {
    fireDatabase
      .ref(reference)
      .orderByChild(key)
      .equalTo(value)
      .on("value", (snapshot) => {
        resolve(snapshot.val());
      });
  });
};

export const postUser = (uid, payload) => {
  return new Promise((resolve, reject) => {
    fireDatabase
      .ref(`${reference}/${uid}`)
      .set(payload)
      .then(() => {
        resolve(
          fetchResponse(200, null, "Berhasil menambahkan data pengguna.")
        );
      })
      .catch((error) => {
        reject(fetchResponse(400, error, "Gagal menambahkan data pengguna."));
      });
  });
};

export const updateUser = (payload) => {
  return new Promise((resolve, reject) => {
    const { user, displayName, photoURL, role } = payload;
    user
      // .updateProfile({
      //   displayName: displayName || user.displayName,
      //   photoURL: photoURL || user.photoURL,
      // })
      .updatePhoneNumber(role)
      .then(() => {
        resolve(
          fetchResponse(200, null, "Berhasil memperbarui data pengguna.")
        );
      })
      .catch((error) => {
        reject(fetchResponse(400, error, "Gagal memperbarui data pengguna."));
      });
  });
};
