import moment from "moment";
import { setDataAlertConfirm } from "./layout";
import {
  setLocalStorage,
  getLocalStorage,
  encrypt,
} from "../../services/helpers";
import { getUserByKey } from "../../services/api";
import { SET_DATA_SESSION } from "../actionTypes";

// === SET USER SESSION ===
export const setUserSession = (dataSession) => (dispatch) => {
  dispatch({
    type: SET_DATA_SESSION,
    payload: dataSession,
  });
};

// === HANDLE LOGIN ===
export const handleLogin =
  (username, password, isRemember) => async (dispatch) => {
    try {
      // === GET DATA USER BY USERNAME/EMAIL ===
      await getUserByKey("email", username)
        .then((response) => {
          let dataUser = {};
          Object.keys(response.data).map((uid, index) => {
            // === GET FIRST USER FROM SEARCH LIST ===
            if (index === 0) {
              dataUser = response.data[uid];
              dataUser.uid = uid;
              dataUser.isRemember = isRemember;
            }
          });

          const encodedPassword = encrypt(password);
          // === COMPARE PASSWORD ===
          if (encodedPassword === dataUser.password) {
            // === SAVE LOGIN DATA TO LOCAL STORAGE ===
            setLocalStorage("access_sdk", dataUser);
            dispatch(setUserSession(dataUser));
            dispatch(
              setDataAlertConfirm({
                type: "success",
                title: "Berhasil Masuk.",
                description: "Anda akan diarahkan ke halaman dashboard ...",
                declineDisable: true,
              })
            );
          } else {
            throw null;
          }
        })
        .catch(() => {
          throw null;
        });
    } catch (error) {
      dispatch(
        setDataAlertConfirm({
          type: "error",
          title: "Gagal!",
          description:
            "Username atau Password yang Anda masukkan tidak sesuai.",
          declineDisable: true,
        })
      );
    }
  };

// === HANDLE LOGOUT ===
export const handleLogout = () => async (dispatch) => {
  localStorage.removeItem("access_sdk");
  dispatch(setUserSession(null));
};

// === HANDLE VALIDATE USER SESSION ===
export const validateSession = () => {
  return new Promise((resolve, reject) => {
    const dataUser = getLocalStorage("access_sdk");

    // === CHECKING SESSION AVAILABELITY ===
    if (dataUser) {
      // === BY PASS USER WITH ISREMEMBER STATUS ===
      if (dataUser && dataUser.isRemember) {
        resolve(dataUser);
      }

      // === CHECKING SESSION EXPIRED ===
      const expiredDate = moment(dataUser.expiredDate).add(1, "days").unix();
      const todayDate = moment().unix();
      if (expiredDate > todayDate) {
        resolve(dataUser);
      }
    }

    reject();
  });
};
