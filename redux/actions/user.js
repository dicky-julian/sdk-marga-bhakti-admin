import { SET_DATA_USER } from "../actionTypes";
import { getUser, postUser, putUser, deleteUser } from "../../services/api";
import { setDataAlertConfirm } from "./layout";

// === SET ALL DATA USER ===
export const setDataUser = (dataUser) => (dispatch) => {
  dataUser.sort((a, b) => a.role - b.role);
  dispatch({
    type: SET_DATA_USER,
    payload: dataUser,
  });
};

// === GET ALL DATA USER ===
export const getDataUser = () => async (dispatch) => {
  try {
    await getUser().then((response) => {
      const { data } = response;
      const dataUser = Object.keys(data).map((uid) => ({
        id: uid,
        ...data[uid],
      }));

      dispatch(setDataUser(dataUser || []));
    });
  } catch (error) {
    dispatch(setDataUser([]));
  }
};

// === POST DATA USER ===
export const postDataUser = (dataPayload) => async (dispatch, state) => {
  try {
    const { dataUser } = state().user;
    await postUser(dataPayload).then((response) => {
      const newDataUser = [...dataUser];
      newDataUser.push(response.data);

      dispatch(setDataUser(newDataUser));
      dispatch(
        setDataAlertConfirm({
          type: "success",
          title: "Berhasil",
          description: response.message,
          declineDisable: true,
        })
      );
    });
  } catch (error) {
    dispatch(
      setDataAlertConfirm({
        type: "error",
        title: "Gagal!",
        description: "Kesalahan saat menyimpan data pengguna.",
      })
    );
  }
};

// === PUT DATA USER ===
export const putDataUser =
  (dataPayload, dataAction) => async (dispatch, state) => {
    try {
      const { dataUser } = state().user;
      const { data, label } = dataAction;

      await putUser(dataPayload, data).then((response) => {
        const newDataUser = [...dataUser];
        newDataUser[label] = response.data;

        dispatch(setDataUser(newDataUser));
        dispatch(
          setDataAlertConfirm({
            type: "success",
            title: "Berhasil",
            description: response.message,
            declineDisable: true,
          })
        );
      });
    } catch (error) {
      dispatch(
        setDataAlertConfirm({
          type: "error",
          title: "Gagal!",
          description:
            error.message || "Kesalahan saat menyimpan data pengguna.",
          declineDisable: true,
        })
      );
    }
  };

// === DELETE DATA USER ===
export const deleteDataUser =
  (dataPayload, dataAction) => async (dispatch, state) => {
    try {
      const { dataUser } = state().user;
      const { label } = dataAction;

      await deleteUser(dataPayload).then((response) => {
        let newDataUser = [...dataUser];

        newDataUser.splice(label, 1);
        dispatch(setDataUser(newDataUser));
        dispatch(setDataAlertConfirm(null));
        setTimeout(() => {
          dispatch(
            setDataAlertConfirm({
              type: "success",
              title: "Berhasil!",
              description: response.message,
              declineDisable: true,
            })
          );
        }, 100);
      });
    } catch (error) {
      dispatch(
        setDataAlertConfirm({
          type: "error",
          title: "Gagal!",
          description:
            error.message || "Kesalahan saat menghapus data pengguna.",
          declineDisable: true,
        })
      );
    }
  };
