import { Row, Col } from "reactstrap";
import { SubHeader } from "../../components/layouts";
import { stafData } from "../../services/dummy";
const headerImage =
  "https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const StafPage = () => {
  return (
    <>
      <SubHeader title="Staf & Karyawan" image={headerImage} />
      <main className="staf-page main-section">
        <Row>
          <Col xl={6} md={10} sm={12}>
            <h3 className="text-roboto">
              Karyawan & Staf SDK Marga Bhakti yang berkompetensi dalam
              mewujudkan layanan pendidikan terbaik bagi putra putri bangsa.
            </h3>
          </Col>
          {stafData.map((data, index) => (
            <Col xl={3} md={4} sm={6} key={index} className="card-staf mb-4">
              <div
                className="img"
                style={{ backgroundImage: `url(${data.image})` }}
              ></div>
              <div className="mt-2">
                <h5 className="text-roboto mb-0">{data.name}</h5>
                <p className="text-secondary">{data.role}</p>
              </div>
            </Col>
          ))}
        </Row>
      </main>
    </>
  );
};

export default StafPage;
