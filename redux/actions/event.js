import { SET_DATA_EVENT } from "../actionTypes";
import { getEvent, postEvent, putEvent, deleteEvent } from "../../services/api";
import { setDataAlertConfirm } from "./layout";

// === SET ALL DATA EVENT ===
export const setDataEvent = (dataEvent) => (dispatch) => {
  dispatch({
    type: SET_DATA_EVENT,
    payload: dataEvent,
  });
};

// === GET ALL DATA EVENT ===
export const getDataEvent = () => async (dispatch) => {
  try {
    await getEvent().then((response) => {
      const { data } = response;
      const dataEvent = Object.keys(data).map((eventId) => ({
        id: eventId,
        ...data[eventId],
      }));
      const newDataEvent = dataEvent.sort(
        (a, b) => Date.parse(b.time) - Date.parse(a.time)
      );
      dispatch(setDataEvent(newDataEvent || []));
    });
  } catch (error) {
    dispatch(setDataEvent([]));
  }
};

// === POST DATA EVENT ===
export const postDataEvent = (dataPayload) => async (dispatch, state) => {
  try {
    const { dataEvent } = state().event;

    await postEvent(dataPayload).then((response) => {
      const newDataEvent = [...dataEvent];
      newDataEvent.push(response.data);

      dispatch(setDataEvent(newDataEvent));
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
        description: "Kesalahan saat menyimpan data acara.",
        declineDisable: true,
      })
    );
  }
};

// === PUT DATA EVENT ===
export const putDataEvent =
  (dataPayload, dataAction) => async (dispatch, state) => {
    try {
      const { dataEvent } = state().event;
      const { label } = dataAction;

      await putEvent(dataPayload).then((response) => {
        const newDataEvent = [...dataEvent];
        newDataEvent[label] = response.data;

        dispatch(setDataEvent(newDataEvent));
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
          description: error.message || "Kesalahan saat menyimpan data acara.",
          declineDisable: true,
        })
      );
    }
  };

// === DELETE DATA EVENT ===
export const deleteDataEvent =
  (dataPayload, dataAction) => async (dispatch, state) => {
    try {
      const { dataEvent } = state().event;
      const { label } = dataAction;

      await deleteEvent(dataPayload)
        .then((response) => {
          let newDataEvent = [...dataEvent];

          newDataEvent.splice(label, 1);
          dispatch(setDataEvent(newDataEvent));
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
          description: error.message || "Kesalahan saat menghapus data acara.",
          declineDisable: true,
        })
      );
    }
  };
