import Link from "next/link";
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
  const openModalHeader = (action, label, sublabel = null) => {
    // setDataModalHeader({
    //   action,
    //   label,
    //   sublabel,
    // });
    dispatch(
      setDataAlertConfirm({
        type: "error",
        title: "Apakah Anda yakin?",
        description: "Semua data yang tidak tersimpan akan hilang!",
        approveDisable: true,
      })
    );
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
    await dispatch(
      postDataLayoutHeader(
        dataPayloadHeader,
        dataModalHeader.label,
        dataModalHeader.sublabel
      )
    );
  };

  useEffect(() => {
    dispatch(getDataLayout());
  }, []);

  return (
    <>
      {dataLayout ? (
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
                  openModalHeader("add", "home", dataLayout.header.home.length)
                }
              >
                <i className="fas fa-plus mr-1"></i> Tambah
              </button>
            </div>
          </div>
          <div className="layout-header-home">
            {dataLayout.header.home.map((header, index) => (
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
                  <Link href={header.redirect_url}>
                    <a>
                      <i className="fas fa-link"></i> URL Tautan
                    </a>
                  </Link>
                  <div className="d-flex">
                    <button className="btn-edit">
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
                    <button className="btn-edit">
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
        <Form onSubmit={handleSubmitHeader}>
          <ModalHeader toggle={closeModalHeader}>Form Modal Header</ModalHeader>
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
            <FormGroup row className="mb-4">
              <Label md={4}>Foto Header</Label>
              <Col md={8}>
                <CustomInput
                  id="header-custuminput"
                  onChange={handleChangeHeader}
                  required
                  name="image"
                  type="file"
                />
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
              {isLoadingLayout ? <Spinner size="sm" color="light" /> : "Simpan"}
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
};

export default LayoutPage;
