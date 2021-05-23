import { fireDatabase, getStorageRef } from "../firebase";
import { fetchResponse, compressImg } from "../helpers";
import { postStorage } from "./store";

const reference = "/achievement";

// === GET ALL DATA ACHIEVEMENT ===
export const getAchievement = () => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(reference).on("value", (snapshot) => {
      const result = snapshot.val();
      if (result) {
        resolve(fetchResponse(200, result, "Berhasil menerima data prestasi."));
      }

      reject(fetchResponse(404, null, "Data prestasi tidak ditemukan."));
    });
  });
};

// === POST DATA ACHIEVEMENT ===
export const postAchievement = (dataAchievement) => {
  return new Promise(async (resolve, reject) => {
    await compressImg(dataAchievement.image).then((imageFile) => {
      dataAchievement.image = imageFile;
    });
    // === #1 SAVE ACHIEVEMENT'S IMAGE TO STORAGE ===
    await postStorage(
      dataAchievement.image,
      `achievement/${new Date().getTime()}`
    )
      .then((response) => {
        dataAchievement.image = response.data;
      })
      .catch((error) => {
        reject(error);
      });

    const reference_path = fireDatabase.ref(reference).push();
    const reference_key = reference_path;
    reference_path
      .set(dataAchievement)
      .then(() => {
        if (reference_key) dataAchievement.id = reference_key;
        resolve(
          fetchResponse(
            200,
            dataAchievement,
            "Berhasil menambahkan data prestasi."
          )
        );
      })
      .catch((error) => {
        reject(fetchResponse(400, error, "Gagal menambahkan data prestasi."));
      });
  });
};

// === PUT DATA ACHIEVEMENT ===
export const putAchievement = (dataAchievement, dataAchievementOld) => {
  return new Promise(async (resolve, reject) => {
    // === #1 IF USER PUT ACHIEVEMENT'S IMAGE, SAVE NEW ACHIEVEMENT'S IMAGE TO STORAGE ===
    if (typeof dataAchievement.image === "object") {
      await compressImg(dataAchievement.image).then((imageFile) => {
        dataAchievement.image = imageFile;
      });

      await postStorage(
        dataAchievement.image,
        `achievement/${new Date().getTime()}`,
        dataAchievementOld.image
      )
        .then((response) => {
          dataAchievement.image = response.data;
        })
        .catch((error) => {
          reject(error);
        });
    }

    // === #2 SAVE ACHIEVEMENT'S DATA WITH SAVE IMAGE'S TO DATABASE ===
    const reference_path = fireDatabase.ref(
      `${reference}/${dataAchievement.id}`
    );
    const newDataAchievement = { ...dataAchievement };
    delete newDataAchievement.id;

    reference_path
      .set(newDataAchievement)
      .then(() => {
        resolve(
          fetchResponse(
            200,
            dataAchievement,
            "Berhasil memperbarui data prestasi."
          )
        );
      })
      .catch((error) => {
        reject(fetchResponse(400, error, "Gagal memperbarui data prestasi."));
      });
  });
};

// === DELETE DATA ACHIEVEMENT ===
export const deleteAchievement = (dataAchievement) => {
  return new Promise((resolve, reject) => {
    const newRef = `${reference}/${dataAchievement.id}`;
    fireDatabase
      .ref(newRef)
      .remove()
      .then(() => {
        if (dataAchievement && dataAchievement.image) {
          const existedImagePath = getStorageRef(dataAchievement.image);
          if (existedImagePath) {
            existedImagePath.delete();
          }
        }
        resolve(
          fetchResponse(
            200,
            dataAchievement,
            "Berhasil menghapus data prestasi."
          )
        );
      })
      .catch((error) => {
        reject(fetchResponse(400, error, "Gagal menghapus data prestasi."));
      });
  });
};
