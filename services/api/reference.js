import { fireDatabase } from "../firebase";
import { fetchResponse } from "../helpers";

const reference = "/references";

export const getReferences = () => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(reference).on(
      "value",
      (snapshot) => {
        resolve(
          fetchResponse(
            200,
            snapshot.val(),
            "Berhasil mendapatkan data referensi."
          )
        );
      },
      (error) => {
        reject(fetchResponse(400, error, "Gagal mendapatkan data referensi."));
      }
    );
  });
};
