import { Spinner } from "reactstrap";

const LoadingPage = () => (
  <div className="loading-page">
    <div className="loading-page-container">
      <img src="https://yayasankarmel.or.id/wp-content/uploads/2019/03/yayasan-pendidikan-karmel-logo.png" />
      <div className="d-flex align-items-center mt-2">
        <p className="mr-2 mb-0">Memuat halaman</p>
        <Spinner size="sm" />
      </div>
    </div>
  </div>
);

export { LoadingPage };
