import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <button className="sidebar-toggle">
        <i className="fas fa-chevron-left"></i>
      </button>

      <div className="sidebar-header">
        <img src="https://yayasankarmel.or.id/wp-content/uploads/2019/03/yayasan-pendidikan-karmel-logo.png" />
        <div className="ml-3">
          <small>SDK MARGA BHAKTI</small>
          <small>MALANG</small>
        </div>
      </div>
      <div className="sidebar-body">
        <Link href="/layout">
          <a className="sidebar-link active">
            <i className="fab fa-codepen"></i>
            Tata Letak
          </a>
        </Link>
        <Link href="/acara">
          <a className="sidebar-link">
            <i class="far fa-calendar"></i>
            Acara
          </a>
        </Link>
        <Link href="/artikel">
          <a className="sidebar-link">
            <i class="far fa-file-alt"></i>
            Artikel
          </a>
        </Link>
        <Link href="/info">
          <a className="sidebar-link">
            <i class="far fa-newspaper"></i>
            Info & Pengumuman
          </a>
        </Link>
      </div>
    </nav>
  );
};

export { Sidebar };
