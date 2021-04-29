import Link from "next/link";
import { useState } from "react";
import { Input, Button } from "reactstrap";
import { SubHeader, Pagination } from "../../components/layouts";
import { eventRef } from "../../services/dummy";

const KegiatanPage = () => {
  const [isSearchToggle, setIsSearchToggle] = useState(false);

  return (
    <>
      <SubHeader
        title="Kegiatan"
        image="https://images.pexels.com/photos/1164572/pexels-photo-1164572.jpeg"
      />
      <main>
        <div className="event-list main-section">
          <div className="main-section-row">
            {/* ===== EVENT'S LISTS ===== */}
            <div>
              <div className="form-search-toggle">
                <Button onClick={() => setIsSearchToggle(!isSearchToggle)}>
                  <i className="fas fa-search"></i>
                </Button>
              </div>
              <div
                className={`form-search mb-4 ${isSearchToggle ? "active" : ""}`}
              >
                <div className="d-flex">
                  <Input placeholder="Masukkan judul ..." />
                  <Input placeholder="Masukkan tanggal ..." />
                </div>
                <Button>Cari</Button>
              </div>

              {eventRef.map(({ title, date, description }, index) => (
                <div className="card-event pt-4 pb-3" key={index}>
                  <div className="card-event-date">
                    <h6>15</h6>
                    <h6>Maret</h6>
                  </div>
                  <div className="card-event-detail">
                    <Link href="/acara/id-acara">
                      <a>
                        <h5 className="text-roboto">{title}</h5>
                      </a>
                    </Link>
                    <p className="text-muted mt-3">{description}</p>
                  </div>
                </div>
              ))}
              {eventRef.map(({ title, date, description }, index) => (
                <div className="card-event pt-4 pb-3" key={index}>
                  <div className="card-event-date">
                    <h6>15</h6>
                    <h6>Maret</h6>
                  </div>
                  <div className="card-event-detail">
                    <Link href="/acara/id-acara">
                      <a>
                        <h5 className="text-roboto">{title}</h5>
                      </a>
                    </Link>
                    <p className="text-muted mt-3">{description}</p>
                  </div>
                </div>
              ))}
              <Pagination className="mt-3" />
            </div>

            {/* ===== INFO SECTION ===== */}
            <div className="event-list-info">
              <div className="title-section mb-3">
                <h5>Info & Pengumuman</h5>
              </div>

              {eventRef.map((data, index) => (
                <div className="card-info pt-3 pb-3" key={index}>
                  <Link href="/acara/id-acara">
                    <a>
                      <h6 className="text-roboto">
                        Guru Besar FMIPA Prof. Drs. R. Soemantri Meninggal Dunia
                      </h6>
                    </a>
                  </Link>
                  <small className="mt-2 text-uppercase text-muted">
                    16 Maret 2021 by Humas Sekolah
                  </small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default KegiatanPage;
