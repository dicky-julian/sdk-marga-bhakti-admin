import { Row, Col } from "reactstrap";
import { SubHeader, Pagination } from "../../components/layouts";
import { achievementRef } from "../../services/dummy";

// const headerImage = "https://images.pexels.com/photos/5094662/pexels-photo-5094662.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const headerImage =
  "https://images.pexels.com/photos/4474032/pexels-photo-4474032.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const PrestasiPage = () => {
  return (
    <>
      <SubHeader title="Prestasi" image={headerImage} />
      <main className="achievement-page">
        <div className="main-section">
          <div>
            <div className="text-center">
              <h3 className="text-roboto">Prestasi Siswa & Siswi</h3>
              <p className="text-description mb-0">
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
            <Pagination className="achievement-pagination" />
          </div>
        </div>
      </main>
    </>
  );
};

export default PrestasiPage;
