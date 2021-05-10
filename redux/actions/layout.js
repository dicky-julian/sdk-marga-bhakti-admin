import {
  SET_IS_LOADING_LAYOUT,
  SET_DATA_LAYOUT,
  SET_DATA_ALERT_CONFIRM,
} from "../actionTypes";
import { getLayout, postLayoutHeader } from "../../services/api";

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
          approveDisable: dataAlertConfirm.approveDisable || false,
          onApprove: dataAlertConfirm.onApprove || null,
          declineLabel: dataAlertConfirm.declineLabel || "Kembali",
        }
      : null,
  });
};

// === GET ALL DATA LAYOUT ===
export const getDataLayout = () => (dispatch) => {
  try {
    getLayout().then((response) => {
      const { data } = response;

      if (data && data.header) {
        data.header.subpages = [];
        Object.keys(data.header).map((key) => {
          if (!Array.isArray(data.header[key])) {
            data.header.subpages.push({
              ...data.header[key],
              label: key,
            });
            delete data.header[key];
          }
        });
      }
      dispatch(setDataLayout(data));
    });
  } catch (error) {
    dispatch(setDataLayout({}));
  }
};

// === POST DATA LAYOUT HEADER ===
export const postDataLayoutHeader = (dataLayout, label, sublabel) => (
  dispatch
) => {
  // === !!! params "sublabel" hanya untuk header home page ===
  dispatch(setIsLoadingLayout(true));
  try {
    postLayoutHeader(dataLayout, label, sublabel).then((response) => {
      console.log(response, "response");
    });
  } catch (error) {
    console.log(error, "error");
  }
  dispatch(setIsLoadingLayout(false));
};
