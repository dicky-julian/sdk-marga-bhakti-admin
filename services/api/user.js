import { fireDatabase, getStorageRef } from "../firebase";
import { postStorage } from "./store";
import { compressImg, fetchResponse } from "../helpers";

const reference = "/user";

// === GET ALL DATA USER ===
export const getUser = () => {
  return new Promise((resolve) => {
    fireDatabase.ref(reference).on("value", (snapshot) => {
      const result = snapshot.val();
      if (result) {
        resolve(fetchResponse(200, result));
      }
    });
  });
};

// === GET USER BY UID ===
export const getUserByKey = (key, value) => {
  return new Promise((resolve) => {
    fireDatabase
      .ref(reference)
      .orderByChild(key)
      .equalTo(value)
      .on("value", (snapshot) => {
        const result = snapshot.val();
        console.log(result, "result");
        resolve(
          fetchResponse(200, result, "Berhasil mendapatkan data pengguna")
        );
      });
  });
};

// === POST DATA USER ===
export const postUser = (dataUser) => {
  return new Promise(async (resolve, reject) => {
    // === #1 IF USER PUT ARTICLE'S IMAGE, SAVE NEW ARTICLE'S IMAGE TO STORAGE ===
    if (typeof dataUser.photoURL === "object") {
      await compressImg(dataUser.photoURL).then(async (imageFile) => {
        await postStorage(imageFile, `user/${new Date().getTime()}`)
          .then((response) => {
            dataUser.photoURL = response.data;
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

    // === #2 SAVE USER'S DATA WITH SAVED IMAGE'S TO DATABASE ===
    const reference_path = fireDatabase.ref(reference).push();
    const reference_key = reference_path.key;
    reference_path
      .set(dataUser)
      .then(() => {
        if (reference_key) dataUser.id = reference_path;
        resolve(
          fetchResponse(200, dataUser, "Berhasil menambahkan data pengguna.")
        );
      })
      .catch((error) => {
        reject(400, error, "Gagal menambahkan data pengguna.");
      });
  });
};

// === PUT DATA USER ===
export const putUser = (dataUser, dataUserOld) => {
  return new Promise(async (resolve, reject) => {
    // === #1 IF PUT USER'S IMAGE, SAVE USER'S IMAGE TO STORAGE ===
    if (typeof dataUser.photoURL === "object") {
      await compressImg(dataUser.photoURL).then(async (imageFile) => {
        await postStorage(
          imageFile,
          `user/${new Date().getTime()}`,
          dataUserOld.photoURL
        )
          .then((response) => {
            dataUser.photoURL = response.data;
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

    // === #2 SAVE USER'S DATA WITH SAVED IMAGE'S TO DATABASE ===
    const reference_path = fireDatabase.ref(`${reference}/${dataUser.id}`);
    const newDataUser = { ...dataUser };
    delete newDataUser.id;

    reference_path
      .set(newDataUser)
      .then(() => {
        resolve(
          fetchResponse(200, dataUser, "Berhasil memperbarui data pengguna.")
        );
      })
      .catch((error) => {
        reject(fetchResponse(400, error, "Gagal memperbarui data pengguna."));
      });
  });
};

// === DELETE DATA PENGGUNA ===
export const deleteUser = (dataUser) => {
  return new Promise((resolve, reject) => {
    const newRef = `${reference}/${dataUser.id}`;
    fireDatabase
      .ref(newRef)
      .remove()
      .then(() => {
        if (dataUser && dataUser.photoURL) {
          const existedImagePath = getStorageRef(dataUser.photoURL);
          if (existedImagePath) {
            existedImagePath.delete();
          }
        }
        resolve(
          fetchResponse(200, dataUser, "Berhasil menghapus data pengguna.")
        );
      })
      .catch((error) => {
        reject(400, error, "Gagal menghapus data pengguna.");
      });
  });
};
