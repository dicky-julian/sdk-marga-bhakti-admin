import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { getDataReference } from "../../redux/actions";

const faviconUrl =
  "https://yayasankarmel.or.id/wp-content/uploads/2019/03/yayasan-pendidikan-karmel-logo.png";

const Sidebar = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { dataReference } = state.reference;
  const { route } = useRouter();

  const [isNavToggle, setIsNavToggle] = useState(false);

  // === GET ALL DATA REFERENCES ===
  useEffect(() => {
    if (!dataReference) {
      dispatch(getDataReference());
    }
  }, []);

  return (
    <nav className={`sidebar ${isNavToggle ? "active" : ""}`}>
      <button
        className={`sidebar-toggle ${isNavToggle ? "active" : ""}`}
        onClick={() => setIsNavToggle(!isNavToggle)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
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
          <Link href="/layout">
            <div
              className={`sidebar-link ${route === "/layout" ? "active" : ""}`}
            >
              <div className="icon-bar mr-3">
                <i className="fas fa-columns"></i>
              </div>
              <span className="link-bar">Tata Letak</span>
            </div>
          </Link>

          <Link href="/kegiatan">
            <div
              className={`sidebar-link ${
                route === "/kegiatan" ? "active" : ""
              }`}
            >
              <div className="icon-bar mr-3">
                <i className="far fa-calendar"></i>
              </div>
              <span className="link-bar">Kegiatan</span>
            </div>
          </Link>

          <Link href="/artikel">
            <div
              className={`sidebar-link ${route === "/artikel" ? "active" : ""}`}
            >
              <div className="icon-bar mr-3">
                <i className="far fa-newspaper"></i>
              </div>
              <span className="link-bar">Artikel</span>
            </div>
          </Link>

          <Link href="/info">
            <div
              className={`sidebar-link ${route === "/info" ? "active" : ""}`}
            >
              <div className="icon-bar mr-3">
                <i className="far fa-file-alt"></i>
              </div>
              <span className="link-bar">Info & Pengumuman</span>
            </div>
          </Link>

          <Link href="/prestasi">
            <div
              className={`sidebar-link ${
                route === "/prestasi" ? "active" : ""
              }`}
            >
              <div className="icon-bar mr-3">
                <i className="fas fa-trophy"></i>
              </div>
              <span className="link-bar">Data Prestasi</span>
            </div>
          </Link>

          <Link href="/pegawai">
            <div
              className={`sidebar-link ${route === "/pegawai" ? "active" : ""}`}
            >
              <div className="icon-bar mr-3">
                <i className="fas fa-users"></i>
              </div>
              <span className="link-bar">Data Pegawai</span>
            </div>
          </Link>

          <div
            className={`sidebar-link ${
              route === "/data-siswa" ? "active" : ""
            }`}
          >
            <div className="icon-bar mr-3">
              <i className="fas fa-user-graduate"></i>
            </div>
            <span className="link-bar">Data Siswa</span>
          </div>

          <div className={`sidebar-link ${route === "/mapel" ? "active" : ""}`}>
            <div className="icon-bar mr-3">
              <i className="fas fa-journal-whills"></i>
            </div>
            <span className="link-bar">Mata Pelajaran</span>
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
