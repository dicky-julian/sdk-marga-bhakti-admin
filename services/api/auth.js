import { fireAuth, fireDatabase } from "../firebase";
import { fetchResponse } from "../helpers";
import { postUser } from "./user";

const reference = "/user";

export const getUserByUid = (uid) => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(`${reference}/${uid}`).on("value", (snapshot) => {
      const result = snapshot.val();
      if (result) {
        resolve(fetchResponse(200, result, "Berhasil menerima data user."));
      }

      reject(fetchResponse(404, null, "Data user tidak ditemukan."));
    });
  });
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        resolve(fetchResponse(200, user, "Berhasil Login."));
      })
      .catch((error) => {
        const { message } = error;
        reject(fetchResponse(400, null, message));
      });
  });
};

export const register = (email, password) => {
  return new Promise(async (resolve, reject) => {
    fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const { user } = userCredential;
        postUser(user.uid);
        resolve(
          fetchResponse(200, user, "Berhasil menambahkan data pengguna.")
        );
      })
      .catch((error) => {
        const { message } = error;
        reject(fetchResponse(400, null, message));
      });
  });
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    fireAuth
      .signOut()
      .then(() => {
        resolve(fetchResponse(200, null, "Berhasil sign out."));
      })
      .catch((error) => {
        const { message } = error;
        reject(fetchResponse(400, null, message));
      });
  });
};
