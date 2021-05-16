import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  Button,
  Label,
  Input,
  Form,
  FormGroup,
  CustomInput,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import {
  setDataAlertConfirm,
  getDataLayout,
  postDataLayoutHeader,
  putDataLayoutHeader,
  deleteDataLayoutHeader,
} from "../redux/actions/layout";
import { PageLoading } from "../components/layouts";

const LayoutPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isLoadingLayout, dataLayout } = state.layout;

  const [dataModalHeader, setDataModalHeader] = useState(null);
  const [dataPayloadHeader, setDataPayloadHeader] = useState({});

  // === CLOSE MODAL POST LAYOUT HEADER ===
  const closeModalHeader = () => {
    if (!isLoadingLayout) {
      setDataModalHeader(null);
      setDataPayloadHeader({});
    }
  };

  // === OPEN MODAL POST LAYOUT HEADER ===
  const openModalHeader = (data = null, label, sublabel = null) => {
    setDataModalHeader({
      data,
      label,
      sublabel,
    });
    if (data) {
      if (data.label) {
        const newDataPayload = { ...data };
        delete newDataPayload.label;
        setDataPayloadHeader(newDataPayload);
      } else {
        setDataPayloadHeader(data);
      }
    }
  };

  // === HANDLE CHANGE MODAL POST LAYOUT HEADER ===
  const handleChangeHeader = async (e) => {
    const { name, value, files } = e.target;
    const dataPayload = { ...dataPayloadHeader };

    if (files) {
      dataPayload[name] = files[0];
    } else {
      dataPayload[name] = value;
    }

    setDataPayloadHeader(dataPayload);
  };

  // === MODAL POST LAYOUT HEADER SUBMISSION ===
  const handleSubmitHeader = async (e) => {
    e.preventDefault();
    if (dataModalHeader.data) {
      await dispatch(putDataLayoutHeader(dataPayloadHeader, dataModalHeader));
    } else {
      await dispatch(postDataLayoutHeader(dataPayloadHeader, dataModalHeader));
    }
    setDataModalHeader(null);
    setDataPayloadHeader({});
  };

  // === DELETE LAYOUT HEADER SUBMISSION ===
  const handleDeleteHeader = async (dataIndex) => {
    dispatch(
      setDataAlertConfirm({
        type: "question",
        title: "Apakah Anda yakin?",
        description: "Data yang dihapus tidak dapat dimuat kembali.",
        onApprove: () =>
          dispatch(
            deleteDataLayoutHeader(dataLayout.header.homepages[dataIndex], {
              label: "home",
              sublabel: dataIndex,
            })
          ),
      })
    );
  };

  useEffect(() => {
    if (!dataLayout) {
      dispatch(getDataLayout());
    }
  }, []);

  return (
    <>
      {dataLayout && dataLayout.header ? (
        <div className="layout-page">
          {/* === HEADER BERANDA === */}
          <div className="layout-page-title">
            <div className="d-flex align-items-center">
              <div className="icon-bar">
                <i className="fas fa-home"></i>
              </div>
              <span>Header Beranda</span>
            </div>
            <div>
              <button
                onClick={() =>
                  openModalHeader(
                    null,
                    "home",
                    dataLayout.header.homepages.length
                  )
                }
              >
                <i className="fas fa-plus mr-1"></i> Tambah
              </button>
            </div>
          </div>
          <div className="layout-header-home">
            {dataLayout.header.homepages.map((header, index) => (
              <div
                className="card-layout-header"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0.3)), url(${header.image})`,
                }}
                key={index}
              >
                <div>
                  <div className="card-layout-header-index">{index + 1}</div>
                  <h5 className="text-uppercase">{header.title}</h5>
                </div>
                <div className="card-tools">
                  <a href={header.redirect_url} target="_blank">
                    <i className="fas fa-link"></i> URL Tautan
                  </a>
                  <div className="d-flex">
                    {dataLayout.header.homepages &&
                      dataLayout.header.homepages.length > 1 && (
                        <button
                          className="btn-light"
                          style={{ color: "#212529" }}
                          onClick={() => handleDeleteHeader(index)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    <button
                      className="btn-edit"
                      onClick={() => openModalHeader(header, "home", index)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* === HEADER SUB HALAMAN === */}
          <div className="layout-page-title mt-5">
            <div className="d-flex align-items-center">
              <div className="icon-bar">
                <i className="fas fa-ellipsis-h"></i>
              </div>
              <span>Header Sub Halaman</span>
            </div>
          </div>

          <div className="layout-header-other">
            {dataLayout.header.subpages.map((header, index) => (
              <div
                className="card-layout-header"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.3)), url(${header.image})`,
                }}
                key={index}
              >
                <div>
                  <h5>{header.title}</h5>
                </div>
                <div className="card-tools justify-content-end">
                  <div className="d-flex">
                    <button
                      className="btn-edit"
                      onClick={() => openModalHeader(header, header.label)}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <PageLoading />
      )}

      <Modal isOpen={Boolean(dataModalHeader)} size="md">
        {dataModalHeader && (
          <Form onSubmit={handleSubmitHeader}>
            <ModalHeader toggle={closeModalHeader}>
              Form Data Header
            </ModalHeader>
            <ModalBody>
              <FormGroup row className="mb-4">
                <Label md={4}>Judul Header</Label>
                <Col md={8}>
                  <Input
                    value={dataPayloadHeader.title || ""}
                    onChange={handleChangeHeader}
                    name="title"
                    required
                  />
                </Col>
              </FormGroup>
              {Number.isInteger(dataModalHeader.sublabel) && (
                <FormGroup row className="mb-4">
                  <Label md={4}>URL Tautan</Label>
                  <Col md={8}>
                    <Input
                      value={dataPayloadHeader.redirect_url || ""}
                      onChange={handleChangeHeader}
                      required
                      name="redirect_url"
                    />
                  </Col>
                </FormGroup>
              )}
              <FormGroup row className="mb-3">
                <Label md={4}>Foto Header</Label>
                <Col md={8}>
                  <CustomInput
                    id="header-custuminput"
                    onChange={handleChangeHeader}
                    required={!dataModalHeader.data}
                    name="image"
                    type="file"
                  />
                  {typeof dataPayloadHeader.image === "string" && (
                    <a
                      target="_blank"
                      href={dataPayloadHeader.image}
                      className="text-primary"
                    >
                      <small>Lihat Gambar</small>
                    </a>
                  )}
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button size="sm" color="secondary" onClick={closeModalHeader}>
                Tutup
              </Button>
              <Button
                size="sm"
                color="dark"
                type="submit"
                disabled={isLoadingLayout}
              >
                {isLoadingLayout ? (
                  <Spinner size="sm" color="light" />
                ) : (
                  "Simpan"
                )}
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Modal>
    </>
  );
};

export default LayoutPage;
