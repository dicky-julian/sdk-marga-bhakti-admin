import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
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
  CustomInput,
  Button,
  Col,
  Spinner,
} from "reactstrap";
import { Table } from "../components/partials/tables";
import { PageLoading } from "../components/layouts";
import {
  getDataArticle,
  postDataArticle,
  putDataArticle,
  deleteDataArticle,
  setDataAlertConfirm,
} from "../redux/actions";
import moment from "moment";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const ArtikelPage = () => {
  const editor = useRef(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [isLoading, setIsLoading] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [dataPayload, setDataPayload] = useState({});
  const [dataContent, setDataContent] = useState("");

  const { dataArticle } = state.article;
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

  // === OPEN MODAL POST ARTICLE ===
  const openModal = (data = null, label) => {
    setDataModal({
      data,
      label,
    });
    setDataPayload(data || {});
  };

  // === CLOSE MODAL POST ARTICLE ===
  const closeModal = () => {
    setDataModal(null);
    setDataPayload({});
    setDataContent("");
  };

  // === HANDLE CHANGE MODAL POST DATA ARTICLE ===
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
      author: "Dicky Julian Pratama",
      description: dataContent,
      visitor: 0,
    };
    if (!payload.created_at) payload.created_at = moment().format("DD-MM-YYYY");

    if (dataModal.data) {
      await dispatch(putDataArticle(payload, dataModal));
    } else {
      await dispatch(postDataArticle(payload));
    }

    setIsLoading(false);
    setDataModal(null);
    setDataPayload({});
    setDataContent("");
  };

  // === DELETE DATA ARTICLE ===
  const handleDelete = async (dataIndex) => {
    dispatch(
      setDataAlertConfirm({
        type: "question",
        title: "Apakah Anda yakin?",
        description: "Data yang dihapus tidak dapat dimuat kembali.",
        onApprove: () =>
          dispatch(
            deleteDataArticle(dataArticle[dataIndex], {
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
      setDataContent(data.description || "");
    },
    delete: (dataIndex) => handleDelete(dataIndex),
  };

  useEffect(() => {
    if (!dataArticle) {
      dispatch(getDataArticle());
    }
  }, []);

  return (
    <>
      {dataArticle ? (
        <div className="article-page">
          <Table
            title="Data Artikel"
            data={dataArticle}
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
            <ModalHeader toggle={closeModal}>Form Data Artikel</ModalHeader>
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
                <Label md={4}>Foto Artikel</Label>
                <Col md={8}>
                  <CustomInput
                    id="article-custominput"
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
              <FormGroup>
                <JoditEditor
                  ref={editor}
                  value={dataContent}
                  tabIndex={1}
                  onChange={(content) => {
                    if (content) setDataContent(content);
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button size="sm" onClick={closeModal}>
                Kembali
              </Button>
              <Button
                size="sm"
                color="dark"
                type="submit"
                disabled={!dataContent || isLoading}
              >
                {isLoading ? <Spinner size="sm" color="light" /> : "Simpan"}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default ArtikelPage;
