import {
  SET_IS_LOADING_LAYOUT,
  SET_DATA_LAYOUT,
  SET_DATA_ALERT_CONFIRM,
} from "../actionTypes";
import {
  getLayout,
  postLayoutHeader,
  putLayoutHeader,
  deleteLayoutHeader,
} from "../../services/api";

// === SET FORM LAYOUT LOADING ===
export const setIsLoadingLayout = (isLoading) => (dispatch) => {
  dispatch({
    type: SET_IS_LOADING_LAYOUT,
    payload: isLoading,
  });
};

// === SET ALL DATA LAYOUT ===
export const setDataLayout = (dataLayout) => (dispatch) => {
  dispatch({
    type: SET_DATA_LAYOUT,
    payload: dataLayout,
  });
};

// === SHOW/HIDE ALERT ===
export const setDataAlertConfirm = (dataAlertConfirm) => (dispatch) => {
  dispatch({
    type: SET_DATA_ALERT_CONFIRM,
    payload: dataAlertConfirm
      ? {
          type: dataAlertConfirm.type || "success",
          isOpen: dataAlertConfirm.isOpen || true,
          title: dataAlertConfirm.title || "",
          description: dataAlertConfirm.description || "",
          approveLabel: dataAlertConfirm.approveLabel || "OK",
          onApprove: dataAlertConfirm.onApprove || null,
          declineLabel: dataAlertConfirm.declineLabel || "Kembali",
          declineDisable: dataAlertConfirm.declineDisable || false,
        }
      : null,
  });
};

// === GET ALL DATA LAYOUT ===
export const getDataLayout = () => (dispatch) => {
  try {
    getLayout().then((response) => {
      const { data } = response;
      const dataLayout = {
        header: {
          homepages: [],
          subpages: [],
        },
      };

      if (data && data.header) {
        Object.keys(data.header).map((key) => {
          if (key === "home") {
            Object.keys(data.header.home).map((homeKey) => {
              dataLayout.header.homepages.push({
                id: homeKey,
                ...data.header.home[homeKey],
              });
            });
          } else {
            dataLayout.header.subpages.push({
              ...data.header[key],
              label: key,
            });
          }
        });
      }
      dispatch(setDataLayout(dataLayout));
    });
  } catch (error) {
    dispatch(setDataLayout({}));
  }
};

// === POST DATA LAYOUT HEADER ===
export const postDataLayoutHeader =
  (dataPayload, dataAction) => async (dispatch, state) => {
    dispatch(setIsLoadingLayout(true));
    try {
      const { dataLayout } = state().layout;
      const { label, sublabel } = dataAction;

      await postLayoutHeader(dataPayload, label).then((response) => {
        const newDataLayout = { ...dataLayout };
        if (label === "home") {
          newDataLayout.header.homepages[sublabel] = response.data;
        } else {
          const layoutIndex = newDataLayout.header.subpages.findIndex(
            (subpages) => subpages.label === label
          );
          if (newDataLayout.header.subpages[layoutIndex] && layoutIndex > -1) {
            newDataLayout.header.subpages[layoutIndex] = response.data;
          }
        }

        dispatch(setDataLayout(newDataLayout));
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
          description: "Kesalahan saat menyimpan data header.",
          declineDisable: true,
        })
      );
    }
    dispatch(setIsLoadingLayout(false));
  };

// === PUT DATA LAYOUT HEADER ===
export const putDataLayoutHeader =
  (dataPayload, dataAction) => async (dispatch, state) => {
    dispatch(setIsLoadingLayout(true));
    try {
      const { dataLayout } = state().layout;
      const { data, label, sublabel } = dataAction;

      await putLayoutHeader(dataPayload, data, label).then((response) => {
        const newDataLayout = { ...dataLayout };
        if (label === "home") {
          newDataLayout.header.homepages[sublabel] = response.data;
        } else {
          const layoutIndex = newDataLayout.header.subpages.findIndex(
            (subpages) => subpages.label === label
          );
          if (newDataLayout.header.subpages[layoutIndex] && layoutIndex > -1) {
            newDataLayout.header.subpages[layoutIndex] = {
              ...response.data,
              label: label,
            };
          }
        }

        dispatch(setDataLayout(newDataLayout));
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
          description: error.message || "Kesalahan saat menyimpan data header.",
          declineDisable: true,
        })
      );
    }
    dispatch(setIsLoadingLayout(false));
  };

// === DELETE DATA LAYOUT HEADER ===
export const deleteDataLayoutHeader =
  (dataPayload, dataAction) => async (dispatch, state) => {
    try {
      const { dataLayout } = state().layout;
      const { label, sublabel } = dataAction;

      await deleteLayoutHeader(dataPayload, label, sublabel)
        .then(() => {
          let newDataLayout = { ...dataLayout };

          dispatch(setDataAlertConfirm(null));
          if (newDataLayout && newDataLayout.header) {
            let selectedHeader = newDataLayout.header.homepages;

            selectedHeader.splice(sublabel, 1);
            dispatch(setDataLayout(newDataLayout));
            setTimeout(() => {
              dispatch(
                setDataAlertConfirm({
                  type: "success",
                  title: "Berhasil!",
                  description: "Data header berhasil dihapus.",
                  declineDisable: true,
                })
              );
            }, 100);
          }
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      console.log(error, "error");
    }
  };
