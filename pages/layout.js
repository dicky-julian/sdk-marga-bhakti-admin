import Link from "next/link";
import { Button } from "reactstrap";
const bgHomeHeader1 =
  "https://images.pexels.com/photos/5905881/pexels-photo-5905881.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const bgHomeHeader2 =
  "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const bgHomeHeader3 =
  "https://images.pexels.com/photos/5149627/pexels-photo-5149627.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";

const LayoutPage = () => {
  return (
    <div className="layout-page">
      <div className="layout-page-title">
        <div className="d-flex align-items-center">
          <div className="icon-bar">
            <i className="fas fa-home"></i>
          </div>
          <span>Header Beranda</span>
        </div>
        <div>
          <button>
            <i className="fas fa-plus mr-1"></i> Tambah
          </button>
        </div>
      </div>

      <div className="layout-header-home">
        <div
          className="card-layout-header"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0.3)), url(${bgHomeHeader1})`,
          }}
        >
          <div>
            <div className="card-layout-header-index">1</div>
            <h5>WE ENSURE BETTER EDUCATION FOR A BETTER WORLD</h5>
          </div>
          <div className="card-tools">
            <Link href="/">
              <a>
                <i class="fas fa-link"></i> URL Tautan
              </a>
            </Link>
            <div className="d-flex">
              <button className="btn-edit">
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button className="btn-delete">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div
          className="card-layout-header"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0.3)), url(${bgHomeHeader2})`,
          }}
        >
          <div>
            <div className="card-layout-header-index">2</div>
            <h5>THE ROOTS OF EDUCATION ARE BITTER, BUT THE FRUIT IS SWEET</h5>
          </div>
          <div className="card-tools">
            <Link href="/">
              <a>
                <i class="fas fa-link"></i> URL Tautan
              </a>
            </Link>
            <div className="d-flex">
              <button className="btn-edit">
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button className="btn-delete">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>

        <div
          className="card-layout-header"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0.3)), url(${bgHomeHeader3})`,
          }}
        >
          <div>
            <div className="card-layout-header-index">3</div>
            <h5>THE GREAT AIM OF EDUCATION IS NOT KNOWLEDGE, BUT ACTION</h5>
          </div>
          <div className="card-tools">
            <Link href="/">
              <a>
                <i class="fas fa-link"></i> URL Tautan
              </a>
            </Link>
            <div className="d-flex">
              <button className="btn-edit">
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button className="btn-delete">
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="layout-page-title mt-5">
        <div className="d-flex align-items-center">
          <div className="icon-bar">
            <i className="fas fa-ellipsis-h"></i>
          </div>
          <span>Header Sub Halaman</span>
        </div>
      </div>
      <div className="layout-header-other">
        <div
          className="card-layout-header"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.3)), url("https://images.pexels.com/photos/1164572/pexels-photo-1164572.jpeg")`,
          }}
        >
          <div>
            <h5>Kegiatan</h5>
          </div>
          <div className="card-tools justify-content-end">
            <div className="d-flex">
              <button className="btn-edit">
                <i className="fas fa-pencil-alt"></i>
              </button>
            </div>
          </div>
        </div>

        <div
          className="card-layout-header"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.3)), url("https://images.pexels.com/photos/2097/desk-office-pen-ruler.jpg")`,
          }}
        >
          <div>
            <h5>Artikel</h5>
          </div>
          <div className="card-tools justify-content-end">
            <div className="d-flex">
              <button className="btn-edit">
                <i className="fas fa-pencil-alt"></i>
              </button>
            </div>
          </div>
        </div>

        <div
          className="card-layout-header"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.3)), url("https://images.pexels.com/photos/4474032/pexels-photo-4474032.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`,
          }}
        >
          <div>
            <h5>Prestasi</h5>
          </div>
          <div className="card-tools justify-content-end">
            <div className="d-flex">
              <button className="btn-edit">
                <i className="fas fa-pencil-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;
