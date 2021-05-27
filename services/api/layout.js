import { fireDatabase, getStorageRef } from "../firebase";
import { fetchResponse, compressImg } from "../helpers";
import { postStorage } from "./store";

const reference = "/layout";

// === GET ALL DATA LAYOUT ===
export const getLayout = () => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(reference).on("value", (snapshot) => {
      const result = snapshot.val();
      if (result) {
        resolve(fetchResponse(200, result, "Berhasil menerima data layout."));
      }

      reject(fetchResponse(404, null, "Data layout tidak ditemukan."));
    });
  });
};

// === POST LAYOUT HEADER ===
export const postLayoutHeader = (dataLayout, label) => {
  return new Promise(async (resolve, reject) => {
    await compressImg(dataLayout.image, 1500, 1500).then((imageFile) => {
      dataLayout.image = imageFile;
    });
    // === #1 SAVE HEADER'S IMAGE TO STORAGE ===
    await postStorage(dataLayout.image, `layout/${new Date().getTime()}`)
      .then((response) => {
        dataLayout.image = response.data;
      })
      .catch((error) => {
        reject(error);
      });

    let reference_path;
    let reference_key;
    if (label === "home") {
      reference_path = fireDatabase.ref(`${reference}/header/home`).push();
      reference_key = reference_path.key;
    } else {
      reference_path = fireDatabase.ref(`${reference}/header/${label}`);
    }

    // === #2 SAVE HEADER'S DATA WITH SAVED IMAGE'S URL TO DATABASE ===
    reference_path
      .set(dataLayout)
      .then(() => {
        if (reference_key) dataLayout.id = reference_key;
        resolve(
          fetchResponse(200, dataLayout, "Berhasil menambahkan data layout.")
        );
      })
      .catch((error) => {
        reject(400, error, "Gagal menambahkan data layout.");
      });
  });
};

// === PUT LAYOUT HEADER ===
export const putLayoutHeader = (dataLayout, dataLayoutOld, label) => {
  return new Promise(async (resolve, reject) => {
    // === #1 IF USER PUT HEADER'S IMAGE, SAVE NEW HEADER'S IMAGE TO STORAGE ===
    if (typeof dataLayout.image === "object") {
      await compressImg(dataLayout.image, 1500, 1500).then((imageFile) => {
        dataLayout.image = imageFile;
      });
      await postStorage(
        dataLayout.image,
        `layout/${new Date().getTime()}`,
        dataLayoutOld.image
      )
        .then((response) => {
          dataLayout.image = response.data;
        })
        .catch((error) => {
          reject(error);
        });
    }

    // === #2 SAVE HEADER'S DATA WITH SAVED IMAGE'S TO DATABASE ===
    const reference_path = fireDatabase.ref(
      `${reference}/header/${label}${
        label === "home" ? `/${dataLayout.id}` : ""
      }`
    );
    const newDataLayout = { ...dataLayout };
    delete newDataLayout.id;

    reference_path
      .set(newDataLayout)
      .then(() => {
        resolve(
          fetchResponse(200, dataLayout, "Berhasil memperbarui data layout.")
        );
      })
      .catch((error) => {
        reject(fetchResponse(400, error, "Gagal memperbarui data layout."));
      });
  });
};

// === DELETE LAYOUT HEADER ===
export const deleteLayoutHeader = (dataLayout, label) => {
  return new Promise((resolve, reject) => {
    const newRef = `${reference}/header/${label}${
      label === "home" ? `/${dataLayout.id}` : ""
    }`;
    fireDatabase
      .ref(newRef)
      .remove()
      .then(() => {
        if (dataLayout && dataLayout.image) {
          const existedImagePath = getStorageRef(dataLayout.image);
          if (existedImagePath) {
            existedImagePath.delete();
          }
        }
        resolve(
          fetchResponse(200, dataLayout, "Berhasil menghapus data layout.")
        );
      })
      .catch((error) => {
        reject(400, error, "Gagal menghapus data layout.");
      });
  });
};
