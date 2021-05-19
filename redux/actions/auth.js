import moment from "moment";
import { setDataAlertConfirm, setDataUrlPusher } from "./layout";
import { setLocalStorage, getLocalStorage } from "../../services/helpers";
import { login, getUserByUid, logout } from "../../services/api";
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
      await login(username, password)
        .then(async (response) => {
          const { uid, email, displayName, photoURL } = response.data;

          // === GET OTHER USER DATA ===
          const dataUser = await getUserByUid(uid);
          const { created_at, role } = dataUser.data;

          const dataSession = {
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
            createdAt: created_at,
            role: role,
            expiredDate: new Date(),
            isRemember: isRemember,
          };

          console.log(dataSession, "dataSession");

          // === SAVE USER DATA TO LOCAL STORAGE ===
          setLocalStorage("access_sdk", dataSession);
          dispatch(setUserSession(dataSession));
          dispatch(
            setDataAlertConfirm({
              type: "success",
              title: "Berhasil Masuk!",
              declineDisable: true,
            })
          );
        })
        .catch((error) => {
          console.log(error, "error login");
        });
    } catch (error) {
      console.log(error, "error");
    }
  };

// === HANDLE LOGOUT ===
export const handleLogout = () => async (dispatch) => {
  try {
    await logout()
      .then(() => {
        setLocalStorage("access_sdk", null);
        dispatch(setUserSession(null));
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error, "error");
  }
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
