import { useState } from "react";
import { useSelector } from "react-redux";
import { PageLoading } from "../components/layouts";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Col,
  Button,
} from "reactstrap";

const headerImg =
  "https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const ProfilePage = () => {
  const state = useSelector((state) => state);
  const { dataSession } = state.auth;
  const { dataReference } = state.reference;

  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className="profile-page">
      {dataSession && dataReference && dataReference.role ? (
        <div
          className="profile-header"
          style={{ backgroundImage: `url(${headerImg})` }}
        >
          <div className="profile-header-card">
            <div className="data-profile-container">
              <img src={dataSession.photoURL} />
              <div className="ml-3">
                <h6 className="mb-0 font-weight-bold">
                  {dataSession.displayName}
                </h6>
                <small>{dataReference.role[dataSession.role]}</small>
                <small
                  className="d-block mt-2 text-primary cursor-pointer"
                  onClick={() => setIsOpenModal(true)}
                >
                  Ubah Profile
                </small>
              </div>
            </div>
            <div className="data-action-container">
              <div>
                <div>
                  <small>Artikel Dibuat</small>
                  <h6 className="font-weight-bold">04</h6>
                </div>
                <div className="icon-bar">
                  <i className="far fa-newspaper"></i>
                </div>
              </div>

              <div>
                <div>
                  <small>Kegiatan Dibuat</small>
                  <h6 className="font-weight-bold">13</h6>
                </div>
                <div className="icon-bar">
                  <i className="far fa-calendar"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageLoading />
      )}

      <Modal isOpen={isOpenModal} toggle={() => setIsOpenModal(!isOpenModal)}>
        <ModalHeader toggle={() => setIsOpenModal(!isOpenModal)}>
          Form Data Pengguna
        </ModalHeader>
        <Form>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button size="sm">Kembali</Button>
            <Button size="sm" color="dark">
              Simpan
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
