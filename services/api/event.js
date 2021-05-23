import { fireDatabase } from "../firebase";
import { fetchResponse } from "../helpers";

const reference = "/event";

// === GET ALL DATA EVENT ===
export const getEvent = () => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(reference).on("value", (snapshot) => {
      const result = snapshot.val();
      if (result) {
        resolve(fetchResponse(200, result, "Berhasil menerima data acara."));
      }

      reject(fetchResponse(404, null, "Data acara tidak ditemukan."));
    });
  });
};

// === POST DATA EVENT ===
export const postEvent = (dataEvent) => {
  return new Promise(async (resolve, reject) => {
    const reference_path = fireDatabase.ref(reference).push();
    const reference_key = reference_path.key;
    reference_path
      .set(dataEvent)
      .then(() => {
        if (reference_key) dataEvent.id = reference_key;
        resolve(
          fetchResponse(200, dataEvent, "Berhasil menambahkan data acara.")
        );
      })
      .catch((error) => {
        reject(fetchResponse(400, error, "Gagal menambahkan data acara."));
      });
  });
};

// === PUT DATA EVENT ===
export const putEvent = (dataEvent) => {
  return new Promise(async (resolve, reject) => {
    const reference_path = fireDatabase.ref(`${reference}/${dataEvent.id}`);
    const newDataEvent = { ...dataEvent };
    delete newDataEvent.id;

    reference_path
      .set(newDataEvent)
      .then(() => {
        resolve(
          fetchResponse(200, dataEvent, "Berhasil memperbarui data acara.")
        );
      })
      .catch((error) => {
        reject(fetchResponse(400, error, "Gagal memperbarui data acara."));
      });
  });
};

// === DELETE DATA EVENT ===
export const deleteEvent = (dataEvent) => {
  return new Promise((resolve, reject) => {
    const newRef = `${reference}/${dataEvent.id}`;
    fireDatabase
      .ref(newRef)
      .remove()
      .then(() => {
        resolve(
          fetchResponse(200, dataEvent, "Berhasil menghapus data acara.")
        );
      })
      .catch((error) => {
        reject(fetchResponse((400, error, "Gagal menghapus data acara.")));
      });
  });
};
