import { SET_DATA_INFO } from "../actionTypes";
import { getInfo, postInfo, putInfo, deleteInfo } from "../../services/api";
import { setDataAlertConfirm } from "./layout";

// === SET ALL DATA INFO ===
export const setDataInfo = (dataInfo) => (dispatch) => {
  dispatch({
    type: SET_DATA_INFO,
    payload: dataInfo,
  });
};

// === GET ALL DATA INFO ===
export const getDataInfo = () => async (dispatch) => {
  try {
    await getInfo().then((response) => {
      const { data } = response;
      const dataInfo = Object.keys(data).map((infoId) => ({
        id: infoId,
        ...data[infoId],
      }));
      const sortedDataArticle = dataInfo.sort(
        (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
      );
      dispatch(setDataInfo(sortedDataArticle || []));
    });
  } catch (error) {
    dispatch(setDataInfo([]));
  }
};

// === POST DATA INFO ===
export const postDataInfo = (dataPayload) => async (dispatch, state) => {
  try {
    const { dataInfo } = state().info;

    await postInfo(dataPayload).then((response) => {
      const newDataInfo = [...dataInfo];
      newDataInfo.push(response.data);

      dispatch(setDataInfo(newDataInfo));
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
        description: "Kesalahan saat menyimpan data info.",
        declineDisable: true,
      })
    );
  }
};

// === PUT DATA INFO ===
export const putDataInfo =
  (dataPayload, dataAction) => async (dispatch, state) => {
    try {
      const { dataInfo } = state().info;
      const { label } = dataAction;

      await putInfo(dataPayload).then((response) => {
        const newDataInfo = [...dataInfo];
        newDataInfo[label] = response.data;

        dispatch(setDataInfo(newDataInfo));
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
          description: error.message || "Kesalahan saat menyimpan data info.",
        })
      );
    }
  };

// === DELETE DATA INFO ===
export const deleteDataInfo =
  (dataPayload, dataAction) => async (dispatch, state) => {
    try {
      const { dataInfo } = state().info;
      const { label } = dataAction;

      await deleteInfo(dataPayload)
        .then((response) => {
          let newDataInfo = [...dataInfo];

          newDataInfo.splice(label, 1);
          dispatch(setDataInfo(newDataInfo));
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
          description: error.message || "Kesalahan saat menghapus data info.",
          declineDisable: true,
        })
      );
    }
  };
