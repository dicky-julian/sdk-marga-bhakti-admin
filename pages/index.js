import Link from "next/link";
import { Row, Col } from "reactstrap";
import { Header } from "../components/layouts";
import {
  achievementRef,
  extracurricularRef,
  eventRef,
  articleRef,
} from "../services/dummy";

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="home-page">
        {/* ===== ABOUT SECTION ===== */}
        <div className="home-about main-section">
          <Row>
            <Col md={6} sm={12}>
              <h6 className="text-secondary mb-1">Lebih Dekat Dengan Kami</h6>
              <h3 className="text-roboto">Profil SDK Marga Bhakti</h3>
              <p className="text-description mb-4">
                Yayasan Karmel adalah lembaga sosial dan pendidikan. Lembaga ini
                didirikan di atas pondasi kepedulian dan semangat keberpihakan
                terhadap masa depan dan nasib hidup kaum miskin dan tertindas,
                terlebih mereka yang tinggal di pelosok-pelosok desa. Untuk itu,
                secara jelas Yayasan Karmel menegaskan dirinya sebagai lembaga
                sosial dan pendidikan yang dinaungi oleh Keuskupan Malang. Dalam
                bidang sosial, Yayasan Karmel secara khusus mengelola panti
                asuhan.
              </p>
              <Link href="/tentang">
                <a className="more-link mb-5">
                  Lihat lebih <i className="fas fa-arrow-right"></i>
                </a>
              </Link>
            </Col>
            <Col md={6} sm={12}>
              <img
                src="https://images.pexels.com/photos/5905920/pexels-photo-5905920.jpeg"
                alt="Picture of the author"
                className="w-100"
              />
            </Col>
          </Row>
        </div>

        {/* ===== ACHIEVEMENT SECTION ===== */}
        <div className="home-achievement">
          <div>
            <div className="text-center pb-5">
              <h3 className="text-roboto">Prestasi Siswa & Siswi</h3>
              <p className="text-description">
                Siswa dan siswi SDK Marga Bhakti aktif dan berprestasi dalam
                kegiatan eksternal.
              </p>
            </div>
            <Row className="pt-5">
              {achievementRef.map(({ title, figure, image }, index) => (
                <Col
                  xl={3}
                  md={4}
                  sm={6}
                  key={index}
                  className="card-achievement-container"
                >
                  <div className="card-achievement">
                    <img src={image} />
                    <h6 className="text-roboto font-weight-bold mt-3 mb-2">
                      {title}
                    </h6>
                    <p>{figure}</p>
                  </div>
                </Col>
              ))}
            </Row>
            <div className="mt-4 text-right">
              <Link href="/tentang/prestasi">
                <a className="more-link">
                  Lihat lebih <i className="fas fa-arrow-right"></i>
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* ===== EXTRACURRICULAR SECTION ===== */}
        <div className="home-extracurricular main-section">
          <Row>
            <Col md={6}>
              <img src="https://ugm.ac.id/galleries/static_image/home-en/living_jogja_1.jpg" />
            </Col>
            <Col md={6} className="pl-5">
              <h3 className="text-roboto">Kegiatan Ekstrakurikuler</h3>
              <p className="text-description">
                Ekstrakurikuler adalah kegiatan non-pelajaran formal yang
                dilakukan peserta didik sekolah atau universitas, umumnya di
                luar jam belajar kurikulum standar. Kegiatan-kegiatan ini ada
                pada setiap jenjang pendidikan dari sekolah dasar sampai
                universitas.
              </p>
              {extracurricularRef.map((title, index) => (
                <p className="text-capitalize mb-2" key={index}>
                  <i className="fas fa-chevron-right mr-3"></i> {title}
                </p>
              ))}
            </Col>
          </Row>
        </div>

        {/* ===== EVENT SECTION ===== */}
        <div className="home-event main-section">
          <div className="text-center pb-5">
            <h3 className="text-roboto">Jadwal Kegiatan Sekolah</h3>
            <p className="text-description">
              Siswa dan siswi SDK Marga Bhakti aktif dan berprestasi dalam
              kegiatan eksternal.
            </p>
          </div>
          <Row>
            {eventRef.map(({ title, date, description }, index) => (
              <Col xl={4} key={index}>
                <div className="card-event">
                  <div className="card-event-date">
                    <h6>15</h6>
                    <h6>Maret</h6>
                  </div>
                  <div className="card-event-detail">
                    <h5 className="text-roboto">{title}</h5>
                    <p className="text-secondary">{description}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* ===== ARTICLE SECTION ===== */}
        <div className="home-article">
          <div>
            <Row>
              {articleRef.map(({ title, image, description }, index) => (
                <Col xl={4} md={6} key={index}>
                  <div className="card-article">
                    <div
                      className="img"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                    <div className="card-article-content">
                      <Link href="/artikel/healty-lifestyle-and-living">
                        <a>
                          <h5 className="text-roboto">{title}</h5>
                        </a>
                      </Link>
                      <p className="mt-3">{description}</p>
                      <small className="mt-2 text-uppercase text-muted">
                        16 Maret 2021 by Humas Sekolah
                      </small>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <div className="text-right">
              <Link href="/tentang/prestasi">
                <a className="more-link">
                  Lihat lebih <i className="fas fa-arrow-right"></i>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
