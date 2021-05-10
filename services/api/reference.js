import { fireDatabase } from "../firebase";

const reference = "/references";

export const getReferences = () => {
  return new Promise((resolve, reject) => {
    fireDatabase.ref(reference).on(
      "value",
      (snapshot) => {
        resolve(snapshot.val());
      },
      (error) => {
        reject(error);
      }
    );
  });
};
