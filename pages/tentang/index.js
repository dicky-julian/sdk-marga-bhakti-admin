import Link from "next/link";
import { useState } from "react";

const AboutPage = () => {
  const headerImage =
    "https://ugm.ac.id/galleries/static_image/about_ugm/balairung.jpg";
  const historyImage = "https://ugm.ac.id/galleries/static_image/about_2.jpg";
  const mapImage = "https://ugm.ac.id/downloads/Struktur%20Organisasi.png";

  const [isCategoryToggle, setIsCategoryToggle] = useState(false);
  return (
    <>
      <main className="about-page">
        <div className="about-header">
          <div>
            <div>
              <h1>
                Tentang <br /> SDK Marga Bhakti
              </h1>
              <span className="title-line"></span>
              <p>
                SDK Marga Bhakti memiliki jati diri sebagai sekolah nasional,
                sekolah perjuangan, sekolah pancasila, sekolah kerakyatan, dan
                sekolah pusat kebudayaan.
              </p>
            </div>
            <div style={{ backgroundImage: `url(${headerImage})` }}></div>
          </div>
        </div>
        <div className="about-list main-section">
          {/* ===== SEJARAH ===== */}
          <div className="about-list-content main-section-row">
            <div className="about-list">
              <div id="sejarah-sekolah">
                <h2 className="text-title text-roboto">Sejarah Sekolah</h2>
                <img src={historyImage} />
                <p className="mt-3 text-secondary">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                  <br />
                  <br />
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>

              <div id="visi-misi" className="pt-5">
                <h2 className="text-title text-roboto">Visi & Misi</h2>
                <p className="font-weight-bold">Visi :</p>
                <p className="text-secondary">
                  Yayasan Karmel sebagai lembaga sosial dan pendidikan Keuskupan
                  Malang terpanggil dalam pencerdasan Anak Bangsa untuk tata
                  kehidupan bersama yang berbudaya berdasarkan kasih dan peduli
                  kepada yang miskin.
                </p>
                <p className="font-weight-bold">Misi :</p>
                <ul className="text-secondary">
                  <li>
                    Mendidik Anak Bangsa agar cerdas dalam intelektual, emosi,
                    dan psikomotorik.
                  </li>
                  <li>
                    Mendidik Anak Bangsa agar mampu mengembangkan humaniora dan
                    religiositas dan menerima perbedaan serta kelebihan orang
                    lain.
                  </li>
                  <li>
                    Membantu orang tua, masyarakat dan pemerintah dalam proses
                    pendidikan anak.
                  </li>
                  <li>Memperjuangkan keadilan dan meningkatkan kebersamaan.</li>
                  <li>Memupuk dan mengembangkan nilai budaya luhur.</li>
                  <li>Memperhatikan dan melayani yang miskin.</li>
                </ul>
              </div>

              <div id="struktur-organisasi" className="pt-5">
                <h2 className="text-title text-roboto">Struktur Organisasi</h2>
                <img src={mapImage} />
              </div>

              <div id="lokasi-sekolah" className="pt-5">
                <h2 className="text-title text-roboto">Lokasi Sekolah</h2>
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=SDK%20Marga%20Bhakti&t=&z=13&ie=UTF8&iwloc=&output=embed"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight="0"
                      marginWidth="0"
                      className="gmap_frame"
                    ></iframe>
                    <a href="https://123movies-to.org"></a>
                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div className={isCategoryToggle ? "active" : ""}>
              <div
                className="d-flex justify-content-between align-items-center"
                onClick={() => setIsCategoryToggle(!isCategoryToggle)}
              >
                <h5 className="text-roboto">Tentang Kami</h5>
                <i className="fas fa-chevron-right"></i>
              </div>
              <ul>
                <Link href="#sejarah-sekolah">
                  <li>
                    <i className="fas fa-chevron-right"></i> Sejarah
                  </li>
                </Link>
                <Link href="#visi-misi">
                  <li>
                    <i className="fas fa-chevron-right"></i> Visi & Misi
                  </li>
                </Link>
                <Link href="#struktur-organisasi">
                  <li>
                    <i className="fas fa-chevron-right"></i> Struktur Organisasi
                  </li>
                </Link>
                <Link href="#lokasi-sekolah">
                  <li>
                    <i className="fas fa-chevron-right"></i> Lokasi Sekolah
                  </li>
                </Link>
                <Link href="/tentang/staf">
                  <a>
                    <li>
                      <i className="fas fa-chevron-right"></i> Staf & Karyawan
                    </li>
                  </a>
                </Link>
                <Link href="/tentang/prestasi">
                  <a>
                    <li>
                      <i className="fas fa-chevron-right"></i> Prestasi
                    </li>
                  </a>
                </Link>
                <a href="https://yayasankarmel.or.id/" target="_blank">
                  <li>
                    <i className="fas fa-chevron-right"></i> Profil Yayasan
                  </li>
                </a>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AboutPage;
