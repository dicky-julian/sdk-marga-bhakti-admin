import { SET_DATA_ACHIEVEMENT } from "../actionTypes";
import {
  getAchievement,
  postAchievement,
  putAchievement,
  deleteAchievement,
} from "../../services/api";
import { setDataAlertConfirm } from "./layout";

// === SET ALL DATA ACHIEVEMENT ===
export const setDataAchievement = (dataAchievement) => (dispatch) => {
  dispatch({
    type: SET_DATA_ACHIEVEMENT,
    payload: dataAchievement,
  });
};

// === GET ALL DATA ACHIEVEMENT ===
export const getDataAchievement = () => async (dispatch) => {
  try {
    await getAchievement().then((response) => {
      const { data } = response;
      const dataAchievement = Object.keys(data).map((achievementId) => ({
        id: achievementId,
        ...data[achievementId],
      }));
      dispatch(setDataAchievement(dataAchievement || []));
    });
  } catch (error) {
    dispatch(setDataAchievement([]));
  }
};

// === POST DATA ACHIEVEMENT ===
export const postDataAchievement = (dataPayload) => async (dispatch, state) => {
  try {
    const { dataAchievement } = state().achievement;
    await postAchievement(dataPayload).then((response) => {
      const newDataAchievement = [...dataAchievement];
      newDataAchievement.push(response.data);

      dispatch(setDataAchievement(newDataAchievement));
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
        description: "Kesalahan saat menyimpan data prestasi.",
        declineDisable: true,
      })
    );
  }
};

// === PUT DATA ACHIEVEMENT ===
export const putDataAchievement =
  (dataPayload, dataAction) => async (dispatch, state) => {
    try {
      const { dataAchievement } = state().achievement;
      const { data, label } = dataAction;

      await putAchievement(dataPayload, data).then((response) => {
        const newDataAchievement = [...dataAchievement];
        newDataAchievement[label] = response.data;

        dispatch(setDataAchievement(newDataAchievement));
        dispatch(
          setDataAlertConfirm({
            type: "success",
            title: "Berhasil",
            descripiton: response.message,
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
            error.message || "Kesalahan saat menyimpan data prestasi..",
          declineDisable: true,
        })
      );
    }
  };

// === DELETE DATA ACHIEVEMENT ===
export const deleteDataAchievement =
  (dataPayload, dataAction) => async (dispatch, state) => {
    try {
      const { dataAchievement } = state().achievement;
      const { label } = dataAction;

      await deleteAchievement(dataPayload)
        .then((response) => {
          let newDataAchievement = [...dataAchievement];

          newDataAchievement.splice(label, 1);
          dispatch(setDataAchievement(newDataAchievement));
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
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      dispatch(
        setDataAlertConfirm({
          type: "error",
          title: "Gagal!",
          description:
            error.message || "Kesalahan saat menghapus data prestasi.",
          declineDisable: true,
        })
      );
    }
  };
