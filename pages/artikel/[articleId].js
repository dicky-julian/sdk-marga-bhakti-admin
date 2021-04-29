import Head from "next/head";
import Link from "next/link";
import { eventRef } from "../../services/dummy";

const articleImage =
  "https://klubwanita.com/wp-content/uploads/2018/12/Tips-Cantik-Ala-Bae-Suzy-1280x720.jpg";

const SingleArticle = () => {
  return (
    <>
      <Head>
        <title>SDK Marga Bhakti - Mengenal Yayasan Karmel</title>
        <meta
          name="description"
          content="Yayasan Karmel adalah lembaga sosial dan pendidikan."
        />

        <meta itemprop="name" content="Mengenal Yayasan Karmel" />
        <meta
          itemprop="description"
          content="Yayasan Karmel adalah lembaga sosial dan pendidikan."
        />
        <meta
          itemprop="image"
          content="https://klubwanita.com/wp-content/uploads/2018/12/Tips-Cantik-Ala-Bae-Suzy-1280x720.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@publisher_handle" />
        <meta name="twitter:title" content="Page Title" />
        <meta
          name="twitter:description"
          content="Yayasan Karmel adalah lembaga sosial dan pendidikan."
        />
        <meta name="twitter:creator" content="Dicky Julian" />
        <meta
          name="twitter:image:src"
          content="https://klubwanita.com/wp-content/uploads/2018/12/Tips-Cantik-Ala-Bae-Suzy-1280x720.jpg"
        />

        <meta property="og:title" content="Mengenal Yayasan Karmel" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://klubwanita.com" />
        <meta
          property="og:image"
          content="https://klubwanita.com/wp-content/uploads/2018/12/Tips-Cantik-Ala-Bae-Suzy-1280x720.jpg"
        />
        <meta
          property="og:description"
          content="Yayasan Karmel adalah lembaga sosial dan pendidikan."
        />
        <meta property="og:site_name" content="SDK Marga Bhakti" />
        <meta
          property="article:published_time"
          content="2021-09-17T05:59:00+01:00"
        />
        <meta
          property="article:modified_time"
          content="2021-09-16T19:08:47+01:00"
        />
        <meta property="article:section" content="Article Section" />
        <meta property="article:tag" content="#merdekabelajar" />
        <meta property="fb:admins" content="Facebook numberic ID" />
      </Head>
      <main>
        <div className="single-article-list main-section">
          <div className="main-section-row">
            {/* ===== ARTICLE CONTENT ===== */}
            <div className="single-article-content">
              <div className="social-media-link">
                <a>
                  <div className="facebook">
                    <i className="fab fa-facebook-f"></i>
                  </div>
                </a>
                <a>
                  <div className="twitter">
                    <i className="fab fa-twitter"></i>
                  </div>
                </a>
                <a>
                  <div className="whatsapp">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                </a>
              </div>
              <div>
                <h3>
                  Kami Meningkatkan Judul SGD Berdasarkan Peringkat Dampak
                  Universitas 2021
                </h3>
                <div className="single-article-content-info">
                  <div>
                    <i className="far fa-user"></i>
                    <span>Dicky Julian Pratama</span>
                  </div>
                  <div>
                    <i className="far fa-clock"></i>
                    <span>18 Januari 2021</span>
                  </div>
                  <div>
                    <i className="far fa-eye"></i>
                    <span>10292</span>
                  </div>
                </div>
                <img src={articleImage} />
                <div className="single-article-content-description">
                  <p>
                    Dosen Fakultas Kedokteran, Kesehatan Masyarakat dan
                    Keperawatan (FKKMK) UGM, Prof. Dr. dr. Agus Supartoto, Sp.
                    M(K)., dikukuhkan sebagai Guru Besar UGM dalam bidang Ilmu
                    Kesehatan Mata. Upacara pengukuhan Guru Besar ini dilakukan
                    Kamis (1/4) di Balai Senat, Gedung Pusat UGM. Pada pidato
                    pengukuhan Guru Besar, Agus Supartoto menyampaikan pidato
                    yang berjudul Peran Biopsi Cair pada Keganasan Mata sebagai
                    Penegakan Diagnosis Masa Depan.
                  </p>
                  <p>
                    Agus Supartoto mengatakan penderita kanker mata di Indonesia
                    selalu meningkat. Meski laporan belum tercatat secara baik,
                    namun diketahui di RS Wahidin Sudirohusodo, Makassar,
                    ditemukan ada 70 kasus sepanjang tahun 2014-2016.
                    Selanjutnya di Dr Soetomo Surabaya ditemukan 44 kasus sejak
                    tahun 2010-2012. Lalu, di RS Sardjito Yogyakarta ditemukan
                    51 kejadian retino blastoma dan 40 kasus orbito-cranial
                    meningioma sejak 2012-2017.
                  </p>
                </div>
              </div>
            </div>
            {/* ===== INFO SECTION ===== */}
            <div className="single-article-info">
              <div className="title-section mb-3">
                <h5>Artikel Terkait</h5>
              </div>

              {eventRef.map((data, index) => (
                <div className="card-info pt-3 pb-3" key={index}>
                  <Link href="/artikel/soemantri">
                    <a>
                      <h6 className="text-roboto">
                        Guru Besar FMIPA Prof. Drs. R. Soemantri Meninggal Dunia
                      </h6>
                    </a>
                  </Link>
                  <small className="mt-2 text-uppercase">
                    16 Maret 2021 by <b>Humas Sekolah</b>
                  </small>
                </div>
              ))}

              <div className="title-section mt-5 mb-3">
                <h5>Info & Pengumuman</h5>
              </div>

              {eventRef.map((data, index) => (
                <div className="card-info pt-3 pb-3" key={index}>
                  <Link href="/acara/id-acara">
                    <a>
                      <h6 className="text-roboto">
                        Informasi Pengambilan Rapor
                      </h6>
                    </a>
                  </Link>
                  <small className="mt-2 text-uppercase">
                    16 Maret 2021 by <b>Humas Sekolah</b>
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

export default SingleArticle;
