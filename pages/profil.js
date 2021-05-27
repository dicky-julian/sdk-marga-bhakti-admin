import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PageLoading } from "../components/layouts";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Col,
  Input,
  CustomInput,
  Button,
  Label,
  Spinner,
} from "reactstrap";
import moment from "moment";
import { updateUserSession } from "../redux/actions";

const headerImg =
  "https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { dataSession } = state.auth;
  const { dataReference } = state.reference;

  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataPayload, setDataPayload] = useState({});

  // === OPEN MODAL POST PROFILE ===
  const openModal = () => {
    setIsOpenModal(true);
    setDataPayload({
      displayName: dataSession.displayName || "",
      photoURL: dataSession.photoURL || "",
    });
  };

  // === CLOSE MODAL POST PROFILE ===
  const closeModal = () => {
    setIsOpenModal(false);
  };

  // === HANDLE CHANGE MODAL POST DATA PROFILE ===
  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    const payload = { ...dataPayload };

    if (files) {
      payload[name] = files[0];
    } else {
      payload[name] = value;
    }

    setDataPayload(payload);
  };

  // === MODAL POST PROFILE SUBMISSION ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...dataSession,
      ...dataPayload,
      updated_at: moment().format("YYYY-MM-DD hh:mm:ss"),
    };

    await dispatch(updateUserSession(payload, dataSession));
    setIsLoading(false);
  };

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
                  onClick={openModal}
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

      <Modal isOpen={isOpenModal} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Form Data Pengguna</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup row>
              <Label md={4}>Nama</Label>
              <Col md={8}>
                <Input
                  onChange={handleChange}
                  value={dataPayload.displayName || ""}
                  name="displayName"
                  required
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label md={4}>Foto Profil</Label>
              <Col md={8}>
                <CustomInput
                  id="profile-custominput"
                  onChange={handleChange}
                  name="photoURL"
                  type="file"
                />
                {typeof dataPayload.photoURL === "string" && (
                  <a
                    target="_blank"
                    href={dataPayload.photoURL}
                    className="text-primary"
                  >
                    <small>Lihat Gambar</small>
                  </a>
                )}
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" onClick={closeModal}>
              Kembali
            </Button>
            <Button size="sm" color="dark" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner size="sm" color="light" /> : "Simpan"}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
