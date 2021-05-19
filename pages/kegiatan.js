import { useEffect, useRef, useState } from "react";
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
  getDataEvent,
  postDataEvent,
  putDataEvent,
  deleteDataEvent,
  setDataAlertConfirm,
} from "../redux/actions";
import DatePicker from "react-flatpickr";
import moment from "moment";

const AcaraPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [isLoading, setIsLoading] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [dataPayload, setDataPayload] = useState({});

  const { dataEvent } = state.event;

  const dataField = [
    {
      title: "Judul",
      field: "title",
    },
    {
      title: "PIC",
      field: "pic",
    },
    {
      title: "Peserta",
      field: "participant",
    },
    {
      title: "Tanggal Acara",
      field: "time",
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

  // === HANDLE CHANGE TIME MODAL POST DATA EVENT ===
  const handleChangeTime = async (name, value) => {
    const payload = { ...dataPayload };
    payload[name] = value;

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
      await dispatch(putDataEvent(payload, dataModal));
    } else {
      await dispatch(postDataEvent(payload));
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
            deleteDataEvent(dataEvent[dataIndex], {
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
    if (!dataEvent) {
      dispatch(getDataEvent());
    }
  }, []);

  return (
    <>
      {dataEvent ? (
        <div className="event-page">
          <Table
            title="Data Kegiatan"
            data={dataEvent}
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
            <ModalHeader toggle={closeModal}>Form Data Acara</ModalHeader>
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
                  <Input
                    type="textarea"
                    value={dataPayload.description || ""}
                    onChange={handleChange}
                    name="description"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mb-4">
                <Label md={4}>PIC</Label>
                <Col md={8}>
                  <Input
                    value={dataPayload.pic || ""}
                    onChange={handleChange}
                    name="pic"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mb-4">
                <Label md={4}>Peserta</Label>
                <Col md={8}>
                  <Input
                    value={dataPayload.participant || ""}
                    onChange={handleChange}
                    name="participant"
                    required
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mb-4">
                <Label md={4}>Waktu Acara</Label>
                <Col md={8}>
                  <DatePicker
                    value={dataPayload.time || null}
                    className="form-control"
                    onChange={(time, date) => handleChangeTime("time", date)}
                    options={{
                      enableTime: true,
                      dateFormat: "d-m-Y H:i",
                    }}
                  />
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

export default AcaraPage;
