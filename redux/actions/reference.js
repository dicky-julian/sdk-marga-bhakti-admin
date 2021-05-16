import { SET_DATA_REFERENCE } from "../actionTypes";
import { getReferences } from "../../services/api";

export const setDataReference = (dataReference) => (dispatch) => {
  dispatch({
    type: SET_DATA_REFERENCE,
    payload: dataReference,
  });
};

export const getDataReference = () => async (dispatch) => {
  try {
    await getReferences()
      .then((response) => {
        const { data } = response;
        dispatch(setDataReference(data));
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    console.log(error, "error");
  }
};
