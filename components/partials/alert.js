import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, Button } from "reactstrap";
import { setDataAlertConfirm } from "../../redux/actions";

export const AlertConfirm = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { dataAlertConfirm } = state.layout;

  const alertIcon = dataAlertConfirm
    ? dataAlertConfirm.type === "success"
      ? "check-circle"
      : dataAlertConfirm.type === "error"
      ? "times-circle"
      : "question-circle"
    : "";

  const closeModal = () => {
    dispatch(setDataAlertConfirm(null));
  };

  return (
    <Modal
      isOpen={dataAlertConfirm && dataAlertConfirm.isOpen}
      className="alert-confirm"
      centered
    >
      {dataAlertConfirm && (
        <ModalBody className="alert-confirm-body">
          <div className="text-center">
            <i
              className={`far fa-${alertIcon} ${dataAlertConfirm.type || ""}`}
            ></i>
            <h5>
              <b>{dataAlertConfirm.title}</b>
            </h5>
            <p>{dataAlertConfirm.description}</p>
          </div>
          <div className="mt-4">
            {!dataAlertConfirm.declineDisable && (
              <Button color="secondary" onClick={closeModal}>
                {dataAlertConfirm.declineLabel}
              </Button>
            )}
            <Button
              color="dark"
              className="ml-2"
              onClick={dataAlertConfirm.onApprove || closeModal}
            >
              {dataAlertConfirm.approveLabel}
            </Button>
          </div>
        </ModalBody>
      )}
    </Modal>
  );
};
