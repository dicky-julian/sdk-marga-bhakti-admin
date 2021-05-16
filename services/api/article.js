import { fireDatabase, fireStorage, getStorageRef } from "../firebase";
import { fetchResponse } from "../helpers";
import { postStorage } from "./store";

const reference = "/article";

// === GET ALL DATA ARTICLE ===
export const getArticle = () => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(reference).on("value", (snapshot) => {
      const result = snapshot.val();
      if (result) {
        resolve(fetchResponse(200, result, "Berhasil menerima data artikel."));
      }

      reject(fetchResponse(404, null, "Data artikel tidak ditemukan."));
    });
  });
};

// === POST DATA ARTICLE ===
export const postArticle = (dataArticle) => {
  return new Promise(async (resolve, reject) => {
    // === #1 SAVE LAYOUT'S IMAGE TO STORAGE ===
    await postStorage(dataArticle.image, `article/${new Date().getTime()}`)
      .then((response) => {
        dataArticle.image = response.data;
      })
      .catch((error) => {
        reject(error);
      });

    const reference_path = fireDatabase.ref(reference).push();
    const reference_key = reference_path.key;
    reference_path
      .set(dataArticle)
      .then(() => {
        if (reference_key) dataArticle.id = reference_key;
        resolve(
          fetchResponse(200, dataArticle, "Berhasil menambahkan data artikel.")
        );
      })
      .catch((error) => {
        reject(400, error, "Gagal menambahkan data artikel.");
      });
  });
};

// === PUT DATA ARTICLE ===
export const putArticle = (dataArticle, dataArticleOld) => {
  return new Promise(async (resolve, reject) => {
    // === #1 IF USER PUT ARTICLE'S IMAGE, SAVE NEW ARTICLE'S IMAGE TO STORAGE ===
    if (typeof dataArticle.image === "object") {
      await postStorage(
        dataArticle.image,
        `article/${new Date().getTime()}`,
        dataArticleOld.image
      )
        .then((response) => {
          dataArticle.image = response.data;
        })
        .catch((error) => {
          reject(error);
        });
    }

    // === #2 SAVE ARTICLE'S DATA WITH SAVED IMAGES'S TO DATABASE ===
    const reference_path = fireDatabase.ref(`${reference}/${dataArticle.id}`);
    const newDataArticle = { ...dataArticle };
    delete newDataArticle.id;

    reference_path
      .set(newDataArticle)
      .then(() => {
        resolve(
          fetchResponse(200, dataArticle, "Berhasil memperbarui data artikel.")
        );
      })
      .catch((error) => {
        reject(fetchResponse(400, error, "Gagal memperbarui data artikel."));
      });
  });
};

// === DELETE DATA ARTICLE ===
export const deleteArticle = (dataArticle) => {
  return new Promise((resolve, reject) => {
    const newRef = `${reference}/${dataArticle.id}`;
    fireDatabase
      .ref(newRef)
      .remove()
      .then(() => {
        if (dataArticle && dataArticle.image) {
          const existedImagePath = getStorageRef(dataArticle.image);
          if (existedImagePath) {
            existedImagePath.delete();
          }
        }
        resolve(
          fetchResponse(200, dataArticle, "Berhasil menghapus data artikel.")
        );
      })
      .catch((error) => {
        reject(400, error, "Gagal menghapus data artikel.");
      });
  });
};
