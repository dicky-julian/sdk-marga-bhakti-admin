import { SET_IS_LOADING_ARTICLE, SET_DATA_ARTICLE } from "../actionTypes";
import {
  getArticle,
  postArticle,
  putArticle,
  deleteArticle,
} from "../../services/api";
import { setDataAlertConfirm } from "./layout";
import { compressImg } from "../../services/helpers";

// === SET FORM ARTICLE LOADING ===
export const setIsLoadingArticle = (isLoading) => (dispatch) => {
  dispatch({
    type: SET_IS_LOADING_ARTICLE,
    payload: isLoading,
  });
};

// === SET ALL DATA ARTICLE ===
export const setDataArticle = (dataArticle) => (dispatch) => {
  dispatch({
    type: SET_DATA_ARTICLE,
    payload: dataArticle,
  });
};

// === GET ALL DATA ARTICLE ===
export const getDataArticle = () => async (dispatch) => {
  try {
    await getArticle().then((response) => {
      const { data } = response;
      const dataArticle = Object.keys(data).map((articleId) => ({
        id: articleId,
        ...data[articleId],
      }));
      dispatch(setDataArticle(dataArticle || []));
    });
  } catch (error) {
    dispatch(setDataArticle([]));
  }
};

// === POST DATA ARTICLE ===
export const postDataArticle = (dataPayload) => async (dispatch, state) => {
  try {
    const { dataArticle } = state().article;
    await postArticle(dataPayload).then((response) => {
      const newDataArticle = [...dataArticle];
      newDataArticle.push(response.data);

      dispatch(setDataArticle(newDataArticle));
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
        description: "Kesalahan saat menyimpan data artikel.",
        declineDisable: true,
      })
    );
  }
};

// === PUT DATA ARTICLE ===
export const putDataArticle =
  (dataPayload, dataAction) => async (dispatch, state) => {
    try {
      const { dataArticle } = state().article;
      const { data, label } = dataAction;

      await putArticle(dataPayload, data).then((response) => {
        const newDataArticle = [...dataArticle];
        newDataArticle[label] = response.data;

        dispatch(setDataArticle(newDataArticle));
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
            error.message || "Kesalahan saat menyimpan data artikel.",
          declineDisable: true,
        })
      );
    }
  };

// === DELETE DATA ARTICLE ===
export const deleteDataArticle =
  (dataPayload, dataAction) => async (dispatch, state) => {
    try {
      const { dataArticle } = state().article;
      const { label } = dataAction;

      await deleteArticle(dataPayload)
        .then((response) => {
          let newDataArticle = [...dataArticle];

          newDataArticle.splice(label, 1);
          dispatch(setDataArticle(newDataArticle));
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
            error.message || "Kesalahan saat menghapus data artikel.",
          declineDisable: true,
        })
      );
    }
  };
