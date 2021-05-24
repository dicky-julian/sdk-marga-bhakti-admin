import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Label,
  Button,
  Spinner,
} from "reactstrap";
import { Table } from "../components/partials/tables";
import { PageLoading } from "../components/layouts";
import {
  getDataAchievement,
  postDataAchievement,
  putDataAchievement,
  deleteDataAchievement,
  setDataAlertConfirm,
} from "../redux/actions";
import moment from "moment";

const PrestasiPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { dataAchievement } = state.achievement;

  const [isLoading, setIsLoading] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [dataPayload, setDataPayload] = useState({});

  useEffect(() => {
    if (!dataAchievement) {
      dispatch(getDataAchievement());
    }
  }, []);

  const dataField = [
    {
      title: "Judul",
      field: "title",
    },
    {
      title: "Deskripsi",
      field: "description",
      style: {
        minWidth: 300,
      },
    },
    {
      title: "Penulis",
      field: "created_by",
    },
    {
      title: "Tanggal Dibuat",
      field: "created_at",
    },
  ];

  // === HANDLE CHANGE MODAL POST DATA ACHIEVEMENT ===
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

  // === MODAL POST ARTICLE SUBMISSION ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...dataPayload,
      created_by: "Dicky Julian Pratama",
    };

    if (!payload.created_at)
      payload.created_at = moment().format("YYYY-MM-DD hh:mm:ss");

    if (dataModal.data) {
      await dispatch(putDataAchievement(payload, dataModal));
    } else {
      await dispatch(postDataAchievement(payload));
    }

    setIsLoading(false);
    setDataModal(null);
    setDataPayload({});
  };

  // === DELETE DATA ACHIEVEMENT ===
  const handleDelete = async (dataIndex) => {
    dispatch(
      setDataAlertConfirm({
        type: "question",
        title: "Apakah Anda yakin?",
        description: "Data yang dihapus tidak dimuat kembali.",
        onApprove: () =>
          dispatch(
            deleteDataAchievement(dataAchievement[dataIndex], {
              label: dataIndex,
            })
          ),
      })
    );
  };

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

  const actionReferences = {
    add: openModal,
    edit: (data, label) => {
      openModal(data, label);
    },
    delete: (dataIndex) => handleDelete(dataIndex),
  };

  return (
    <>
      {dataAchievement ? (
        <div className="achievement-page">
          <Table
            title="Data Prestasi"
            data={dataAchievement}
            dataField={dataField}
            action={actionReferences}
          />
        </div>
      ) : (
        <PageLoading />
      )}

      <Modal isOpen={Boolean(dataModal)}>
        <ModalHeader toggle={closeModal}>Form Data Prestasi</ModalHeader>
        {dataModal && (
          <Form onSubmit={handleSubmit}>
            <ModalBody>
              <FormGroup row>
                <Label md={4}>Judul</Label>
                <Col md={8}>
                  <Input
                    value={dataPayload.title || ""}
                    onChange={handleChange}
                    name="title"
                    required
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={4}>Deskripsi</Label>
                <Col md={8}>
                  <textarea
                    rows={5}
                    className="form-control"
                    onChange={handleChange}
                    value={dataPayload.description || ""}
                    name="description"
                    required
                  ></textarea>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label md={4}>Judul</Label>
                <Col md={8}>
                  <CustomInput
                    id="achievement-custominput"
                    onChange={handleChange}
                    name="image"
                    type="file"
                    required={!Boolean(dataModal.data)}
                  />
                  {typeof dataPayload.image === "string" && (
                    <a
                      target="_blank"
                      href={dataPayload.image}
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
              <Button size="sm" color="dark" type="submit">
                {isLoading ? <Spinner size="sm" color="light" /> : "Simpan"}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default PrestasiPage;
