import { fireDatabase } from "../firebase";
import { fetchResponse } from "../helpers";

const reference = "/info";

// === GET ALL DATA INFO ===
export const getInfo = () => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(reference).on("value", (snapshot) => {
      const result = snapshot.val();
      if (result) {
        resolve(fetchResponse(200, result, "Berhasil menerima data info."));
      }

      reject(fetchResponse(404, null, "Data info tidak ditemukan"));
    });
  });
};

// === POST DATA INFO ===
export const postInfo = (dataInfo) => {
  return new Promise(async (resolve, reject) => {
    const reference_path = fireDatabase.ref(reference).push();
    const reference_key = reference_path.key;
    reference_path
      .set(dataInfo)
      .then(() => {
        if (reference_key) dataInfo.id = reference_key;
        resolve(
          fetchResponse(200, dataInfo, "Berhasil menambahkan data info.")
        );
      })
      .catch((error) => {
        reject(fetchResponse(400, error, "Gagal menambahkan data info."));
      });
  });
};

// === PUT DATA INFO ===
export const putInfo = (dataInfo) => {
  return new Promise((resolve, reject) => {
    const reference_path = fireDatabase.ref(`${reference}/${dataInfo.id}`);
    const newDataInfo = { ...dataInfo };
    delete newDataInfo.id;

    reference_path.set(newDataInfo).then(() => {
      resolve(fetchResponse(200, dataInfo, "Berhasil memperbarui data info."));
    });
  });
};

// === DELETE DATA INFO ===
export const deleteInfo = (dataInfo) => {
  return new Promise((resolve, reject) => {
    const newRef = `${reference}/${dataInfo.id}`;
    fireDatabase
      .ref(newRef)
      .remove()
      .then(() => {
        resolve(fetchResponse(200, dataInfo, "Berhasil menghapus data info."));
      })
      .catch((error) => {
        reject(400, error, "Gagal menghapus data info.");
      });
  });
};
