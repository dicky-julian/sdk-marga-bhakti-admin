import { Row, Col } from "reactstrap";

const Footer = () => (
  <>
    <footer className="footer">
      <Row>
        <Col md={3}>
          <img src="https://yayasankarmel.or.id/wp-content/uploads/2019/03/yayasan-pendidikan-karmel-logo.png" />
          <h6 className="text-roboto mt-3">SDK MARGA BHAKTI</h6>
          <p>
            Jalan Gempol Marga Bhakti 1, Tanjungrejo, Kec. Sukun, Kota Malang,
            Jawa Timur 65147
          </p>
        </Col>
        <Col md={9}>
          <Row className="justify-content-end">
            <Col md={3} className="footer-link">
              <p className="font-weight-bold text-uppercase">Tentang Kami</p>
              <p className="mb-2">Sambutan Kepala Sekolah</p>
              <p className="mb-2">Sejarah</p>
              <p className="mb-2">Visi & Misi</p>
              <p className="mb-2">Struktur Sekolah</p>
            </Col>
            <Col md={3} className="footer-link">
              <p className="font-weight-bold text-uppercase">Tautan Terkait</p>
              <p className="mb-2">Yayasan Karmel</p>
              <p className="mb-2">Dapodik</p>
            </Col>
            <Col md={3} className="footer-link">
              <p className="font-weight-bold text-uppercase">Pendaftaran</p>
              <p className="mb-2">Info Pendaftaran</p>
              <p className="mb-2">Formulir Pendaftaran</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </footer>
    <div className="footer-copyright">
      <div>
        <small>© 2021 SDK MARGA BHAKTI</small>
      </div>
    </div>
  </>
);

export { Footer };
