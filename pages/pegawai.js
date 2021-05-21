import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  FormGroup,
  Form,
  Input,
  CustomInput,
  Label,
  Button,
  Spinner,
} from "reactstrap";
import { PageLoading } from "../components/layouts";
import { Table } from "../components/partials/tables";
import { encrypt } from "../services/helpers";
import {
  getDataUser,
  postDataUser,
  putDataUser,
  deleteDataUser,
  setDataAlertConfirm,
} from "../redux/actions";
import moment from "moment";
import Select from "react-select";

const PegawaiPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { dataUser } = state.user;
  const { dataReference } = state.reference;

  const [isLoading, setIsLoading] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [dataPayload, setDataPayload] = useState({});
  const [dataRole, setDataRole] = useState(null);
  const dataField = [
    {
      title: "",
      field: "photoURL",
      fieldType: "image",
      style: {
        minWidth: "unset",
      },
    },
    {
      title: "Nama",
      field: "displayName",
      style: {
        minWidth: 250,
      },
    },
    {
      title: "Email",
      field: "email",
      style: {
        minWidth: 250,
      },
    },
    {
      title: "Jabatan",
      field: "role",
      option: dataReference ? dataReference.role : [],
    },
    {
      title: "Tanggal Dibuat",
      field: "created_at",
    },
  ];

  const openModal = (data = null, label) => {
    setDataModal({
      data,
      label,
    });
    setDataPayload(data || {});
  };

  const closeModal = () => {
    setDataModal(null);
    setDataPayload({});
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...dataPayload,
      created_by: "Dicky Julian Pratama",
    };

    if (!payload.created_at) payload.created_at = moment().format("DD-MM-YYYY");
    if (payload.password) payload.password = encrypt(payload.password);

    if (dataModal.data) {
      await dispatch(putDataUser(payload, dataModal));
    } else {
      await dispatch(postDataUser(payload));
    }

    setIsLoading(false);
    setDataModal(null);
    setDataPayload({});
  };

  const handleDelete = (dataIndex) => {
    dispatch(
      setDataAlertConfirm({
        type: "question",
        title: "Apakah Anda yakin?",
        description: "Data yang dihapus tidak dapat dimuat kembali.",
        onApprove: () =>
          dispatch(
            deleteDataUser(dataUser[dataIndex], {
              label: dataIndex,
            })
          ),
      })
    );
  };

  const actionReferences = {
    add: openModal,
    edit: (data, label) => {
      openModal(data, label);
    },
    delete: (dataIndex) => handleDelete(dataIndex),
  };

  useEffect(() => {
    dispatch(getDataUser());
  }, []);

  useEffect(() => {
    if (dataReference && dataReference.role) {
      const dataRole = dataReference.role.map((roleName, roleId) => ({
        value: roleId,
        label: roleName,
      }));

      setDataRole(dataRole);
    }
  }, [dataReference]);

  return (
    <>
      {dataReference && dataReference.role && dataUser ? (
        <div className="pegawai-page">
          <Table
            title="Data Pegawai"
            data={dataUser}
            dataField={dataField}
            action={actionReferences}
          />
        </div>
      ) : (
        <PageLoading />
      )}

      <Modal isOpen={Boolean(dataModal)}>
        <ModalHeader toggle={closeModal}>Form Data Pegawai</ModalHeader>
        {dataModal && (
          <Form onSubmit={handleSubmit}>
            {dataRole ? (
              <ModalBody>
                <FormGroup row className="mb-4">
                  <Label md={4}>Nama</Label>
                  <Col md={8}>
                    <Input
                      value={dataPayload.displayName || ""}
                      onChange={handleChange}
                      name="displayName"
                      required
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="mb-4">
                  <Label md={4}>Email</Label>
                  <Col md={8}>
                    <Input
                      value={dataPayload.email || ""}
                      onChange={handleChange}
                      name="email"
                      required
                    />
                  </Col>
                </FormGroup>
                {!dataModal.data && (
                  <FormGroup row className="mb-4">
                    <Label md={4}>Password</Label>
                    <Col md={8}>
                      <Input
                        value={dataPayload.password || ""}
                        onChange={handleChange}
                        name="password"
                        required
                      />
                    </Col>
                  </FormGroup>
                )}
                <FormGroup row className="mb-4">
                  <Label md={4}>Jabatan</Label>
                  <Col md={8}>
                    <Select
                      options={dataRole}
                      value={dataRole.find(
                        ({ value }) => value === dataPayload.role
                      )}
                      onChange={({ value }) =>
                        setDataPayload({
                          ...dataPayload,
                          role: value,
                        })
                      }
                    />
                  </Col>
                </FormGroup>
                <FormGroup row className="mb-4">
                  <Label md={4}>Foto Profil</Label>
                  <Col md={8}>
                    <CustomInput
                      id="user-custominput"
                      onChange={handleChange}
                      name="photoURL"
                      type="file"
                      required={!Boolean(dataModal.data)}
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
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center pt-5 pb-5">
                <Spinner color="dark" size="sm" />
                <small className="mt-1">Memuat data ...</small>
              </div>
            )}
            <ModalFooter>
              <Button size="sm" onClick={closeModal}>
                Kembali
              </Button>
              <Button type="submit" size="sm" color="dark">
                {isLoading ? <Spinner size="sm" color="light" /> : "Simpan"}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default PegawaiPage;
