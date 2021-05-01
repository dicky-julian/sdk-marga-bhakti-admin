import { Button } from "reactstrap";

const faviconUrl =
  "https://yayasankarmel.or.id/wp-content/uploads/2019/03/yayasan-pendidikan-karmel-logo.png";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div>
        <div className="sidebar-header">
          <img src={faviconUrl} width={35} />
          <div className="text-uppercase ml-3">
            <span>SDK Marga Bhakti</span>
            <span>Malang</span>
          </div>
        </div>

        <span className="sidebar-divider" />

        <div className="sidebar-body">
          <div className="sidebar-link active">
            <div className="icon-bar mr-3">
              <i className="fas fa-columns"></i>
            </div>
            <span className="link-bar">Tata Letak</span>
          </div>

          <div className="sidebar-link">
            <div className="icon-bar mr-3">
              <i className="far fa-calendar"></i>
            </div>
            <span className="link-bar">Acara</span>
          </div>

          <div className="sidebar-link">
            <div className="icon-bar mr-3">
              <i className="far fa-newspaper"></i>
            </div>
            <span className="link-bar">Artikel</span>
          </div>

          <div className="sidebar-link">
            <div className="icon-bar mr-3">
              <i className="far fa-file-alt"></i>
            </div>
            <span className="link-bar">Info & Pengumuman</span>
          </div>

          <div className="sidebar-link">
            <div className="icon-bar mr-3">
              <i className="fas fa-journal-whills"></i>
            </div>
            <span className="link-bar">Mata Pelajaran</span>
          </div>

          <div className="sidebar-link">
            <div className="icon-bar mr-3">
              <i className="fas fa-users"></i>
            </div>
            <span className="link-bar">Data Guru</span>
          </div>

          <div className="sidebar-link">
            <div className="icon-bar mr-3">
              <i className="fas fa-user-graduate"></i>
            </div>
            <span className="link-bar">Data Siswa</span>
          </div>
        </div>
      </div>

      <div className="sidebar-footer mt-4 mr-3 p-3">
        <div className="icon-bar">
          <i className="fas fa-info"></i>
        </div>
        <h6 className="font-weight-bold mt-3">Informasi Keamanan!</h6>
        <small>
          Semua aktivitas pada halaman ini terekam ke dalam database.
        </small>
        <Button color="light">Lihat Aktivitas</Button>
      </div>
    </nav>
  );
};

export { Sidebar };
