import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Col,
  Spinner,
} from "reactstrap";
import { Table } from "../components/partials/tables";
import { PageLoading } from "../components/layouts";
import {
  getDataInfo,
  postDataInfo,
  putDataInfo,
  deleteDataInfo,
  setDataAlertConfirm,
} from "../redux/actions";
import moment from "moment";

const InfoPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [isLoading, setIsLoading] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [dataPayload, setDataPayload] = useState({});

  const { dataInfo } = state.info;

  const dataField = [
    {
      title: "Judul",
      field: "title",
    },
    {
      title: "Penulis",
      field: "author",
    },
    {
      title: "Tanggal Dibuat",
      field: "created_at",
    },
    {
      title: "Banyak Dilihat",
      field: "visitor",
    },
  ];

  // === OPEN MODAL POST EVENT ===
  const openModal = (data = null, label) => {
    setDataModal({
      data,
      label,
    });
    setDataPayload(data || {});
  };

  // === CLOSE MODAL POST EVENT ===
  const closeModal = () => {
    setDataModal(null);
    setDataPayload({});
  };

  // === HANDLE CHANGE MODAL POST DATA EVENT ===
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

  // === MODAL POST EVENT SUBMISSION ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      ...dataPayload,
      author: "Dicky Julian Pratama",
      visitor: 0,
    };
    if (!payload.created_at) payload.created_at = moment().format("DD-MM-YYYY");

    if (dataModal.data) {
      await dispatch(putDataInfo(payload, dataModal));
    } else {
      await dispatch(postDataInfo(payload));
    }

    setIsLoading(false);
    setDataModal(null);
    setDataPayload({});
  };

  // === DELETE DATA EVENT ===
  const handleDelete = async (dataIndex) => {
    dispatch(
      setDataAlertConfirm({
        type: "question",
        title: "Apakah Anda yakin?",
        description: "Data yang dihapus tidak dapat dimuat kembali.",
        onApprove: () =>
          dispatch(
            deleteDataInfo(dataInfo[dataIndex], {
              label: dataIndex,
            })
          ),
      })
    );
  };

  const actionReferences = {
    add: openModal,
    edit: (data, label) => openModal(data, label),
    delete: (dataIndex) => handleDelete(dataIndex),
  };

  useEffect(() => {
    if (!dataInfo) {
      dispatch(getDataInfo());
    }
  }, []);

  return (
    <>
      {dataInfo ? (
        <div className="event-page">
          <Table
            title="Data Kegiatan"
            data={dataInfo}
            dataField={dataField}
            action={actionReferences}
          ></Table>
        </div>
      ) : (
        <PageLoading />
      )}

      <Modal isOpen={Boolean(dataModal)}>
        {dataModal && (
          <Form onSubmit={handleSubmit}>
            <ModalHeader toggle={closeModal}>Form Data Pengumuman</ModalHeader>
            <ModalBody>
              <FormGroup row className="mb-4">
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
              <FormGroup row className="mb-4">
                <Label md={4}>Deskripsi</Label>
                <Col md={8}>
                  <textarea
                    rows={5}
                    className="form-control"
                    onChange={handleChange}
                    name="description"
                    required
                  >
                    {dataPayload.description || ""}
                  </textarea>
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
        )}
      </Modal>
    </>
  );
};

export default InfoPage;
