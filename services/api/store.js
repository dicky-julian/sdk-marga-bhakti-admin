import { fireStorage, getStorageRef } from "../firebase";
import { fetchResponse } from "../helpers";

export const postStorage = (file, reference, oldFileURL) => {
  return new Promise(async (resolve, reject) => {
    const storagePath = fireStorage.child(reference);

    await storagePath.put(file).on(
      "state_changed",
      () => {},
      (error) => {
        reject(fetchResponse(400, null, "Kesalahan ketika mengunggah file."));
      },
      () => {
        if (oldFileURL) {
          const storagePathOld = getStorageRef(oldFileURL);
          storagePathOld.delete();
        }

        storagePath
          .getDownloadURL()
          .then((fileURL) => {
            resolve(fetchResponse(200, fileURL, "Berhasil menunggah file."));
          })
          .catch(() => {
            reject(
              fetchResponse(400, null, "Kesalahan ketika mengunggah file.")
            );
          });
      }
    );
  });
};
