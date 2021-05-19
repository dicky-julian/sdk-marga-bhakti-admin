import jwt from "jsonwebtoken";
import resizer from "react-image-file-resizer";
import { NEXT_PUBLIC_HASH_KEY } from "../config";

export const setLocalStorage = (key, data) => {
  if (data) {
    const encodedData = jwt.sign(data, NEXT_PUBLIC_HASH_KEY);
    if (encodedData) {
      localStorage.setItem(key, encodedData);
    }
    return encodedData;
  } else {
    localStorage.setItem(key, null);
  }
};

export const getLocalStorage = (key) => {
  const encodedData = localStorage.getItem(key);
  if (encodedData) {
    const decodedData = jwt.verify(encodedData, NEXT_PUBLIC_HASH_KEY);
    return decodedData;
  }
  return null;
};

export const compressImg = (file, width = 750, height = 750) => {
  return new Promise((resolve) => {
    resizer.imageFileResizer(
      file,
      width,
      height,
      "WEBP",
      50,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
};
