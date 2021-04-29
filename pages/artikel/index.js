import Link from "next/link";
import { SubHeader, Pagination } from "../../components/layouts";

const ArtikelPage = () => {
  const image = [
    "https://1.bp.blogspot.com/-P4ZXIm9IFFw/X-FyQsnPSqI/AAAAAAAAIbM/2pn-mhS_zysmJkzG1u_xuy3lCGRi_7zDQCLcBGAsYHQ/s1200/profil%2Bbae%2Bsuzy.png",
    "https://cdn-2.tstatic.net/batam/foto/bank/images/bae-suzy_20171110_202457.jpg",
    "https://img.republicworld.com/republic-prod/stories/promolarge/xxhdpi/lbboteqz0ugabq9o_1607606747.jpeg?tr=w-1242,h-710,f-jpeg",
  ];

  return (
    <>
      <SubHeader
        title="Artikel"
        image="https://images.pexels.com/photos/2097/desk-office-pen-ruler.jpg"
      />
      <main>
        <div className="article-list main-section">
          <div>
            {/* <h3 className="text-roboto text-title text-capitalize font-weight-bold">
              Artikel Terbaru
            </h3> */}
            <div className="article-list-release">
              <div className="card-article-highlight">
                <div
                  className="img"
                  style={{ backgroundImage: `url(${image[0]})` }}
                ></div>
                <div className="card-article-highlight-content">
                  <Link href="/artikel/9N2I3BISZ8XSD">
                    <a>
                      <h6 className="text-roboto">
                        Rankings 2021 We Improvement on SGDs Title Based on The
                        University Impact Rankings 2021
                      </h6>
                    </a>
                  </Link>
                  <Link href="/artikel/9N2I3BISZ8XSD">
                    <a>Lihat Artikel</a>
                  </Link>
                </div>
              </div>

              <div className="card-article">
                <div
                  className="img"
                  style={{ backgroundImage: `url(${image[1]})` }}
                ></div>
                <div className="card-article-content bg-fade">
                  <Link href="/artikel/9N2I3BISZ8XSD">
                    <a>
                      <h6 className="text-roboto">
                        Rankings 2021 We Improvement on SGDs Title Based on The
                        University Impact Rankings 2021
                      </h6>
                    </a>
                  </Link>
                  <Link href="/artikel/9N2I3BISZ8XSD">
                    <a>Lihat Artikel</a>
                  </Link>
                </div>
              </div>

              <div className="card-article">
                <div
                  className="img"
                  style={{ backgroundImage: `url(${image[2]})` }}
                ></div>
                <div className="card-article-content bg-fade">
                  <Link href="/artikel/9N2I3BISZ8XSD">
                    <a>
                      <h6 className="text-roboto">
                        We Improvement on SGDs Title Based on The University
                        Impact Rankings 2021
                      </h6>
                    </a>
                  </Link>
                  <Link href="/artikel/9N2I3BISZ8XSD">
                    <a>Lihat Artikel</a>
                  </Link>
                </div>
              </div>
            </div>

            <div className="main-section-row">
              {/* ===== ARTICLE'S LISTS ===== */}
              <div>
                {image.map((dataImage, index) => (
                  <div className="card-article-horizon mb-4" key={index}>
                    <img src={dataImage} />
                    <div>
                      <Link href="/artikel/9N2I3BISZ8XSD">
                        <a>
                          <h6 className="text-roboto">
                            We Improvement on SGDs Title Based on The University
                            Impact Rankings 2021
                          </h6>
                        </a>
                      </Link>
                      <p className="mt-2">
                        Pengurus Pusat Yayasan Badan Pendidikan Kristen (YBPK)
                        GKJW mengadakan acara pelepasan dan pelantikan bersama .
                        . .
                      </p>
                      <small className="mt-3 text-uppercase text-muted">
                        16 Maret 2021 by Humas Sekolah
                      </small>
                    </div>
                  </div>
                ))}
                <hr />
                <Pagination className="mt-3" />
              </div>

              {/* ===== INFO SECTION ===== */}
              <div className="article-list-info">
                <div className="title-section mb-3">
                  <h5>Populer Hari Ini</h5>
                </div>
                {image.map((dataImage, index) => (
                  <div className="card-info pt-3 pb-3" key={index}>
                    <Link href="/artikel/9N2I3BISZ8XSD">
                      <a>
                        <h6 className="text-roboto">
                          We Improvement on SGDs Title Based on The University
                          Impact Rankings 2021
                        </h6>
                      </a>
                    </Link>
                    <small className="mt-3 text-uppercase text-muted">
                      16 Maret 2021 by Humas Sekolah
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ArtikelPage;
