import { fireDatabase, fireStorage } from "../firebase";
import { fetchResponse } from "../helpers";

const reference = "/layout";

// === GET ALL DATA LAYOUT ===
export const getLayout = () => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(reference).on("value", (snapshot) => {
      const result = snapshot.val();
      if (result) {
        resolve(fetchResponse(200, result, "Berhasil menerima data layout."));
      }

      reject(fetchResponse(404, null, "Data layout tidak ditemukan"));
    });
  });
};

// === POST LAYOUT HEADER ===
export const postLayoutHeader = (dataLayout, label, sublabel) => {
  return new Promise((resolve, reject) => {
    const storagePath = fireStorage.child(`layout/${new Date().getTime()}`);
    const storageRef = storagePath.put(dataLayout.image);

    // === #1 SAVE HEADER'S IMAGE TO STORAGE ===
    storageRef.on(
      "state_changed",
      () => {},
      (error) => {
        reject(fetchResponse(400, error, "Kesalahan ketika menyimpan gambar."));
      },
      () => {
        // === #2 SAVE HEADER'S DATA WITH SAVED IMAGE'S URL TO DATABASE ===
        storagePath.getDownloadURL().then(async (fileURL) => {
          dataLayout.image = fileURL;
          const newRef = `${reference}/header/${label}${
            sublabel ? `/${sublabel}` : ""
          }`;
          fireDatabase
            .ref(newRef)
            .set(dataLayout)
            .then(() => {
              resolve(
                fetchResponse(200, null, "Berhasil menambahkan data layout")
              );
            })
            .catch((error) => {
              reject(400, error, "Gagal menambahkan data layout.");
            });
        });
      }
    );
  });
};
