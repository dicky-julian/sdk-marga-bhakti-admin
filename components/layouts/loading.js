import Image from "next/image";
import { Spinner } from "reactstrap";

const PageLoading = () => (
  <div className="loading-page">
    <div className="d-flex flex-column align-items-center">
      <Image src="/icon.png" width={75} height={75} />
      <div className="d-flex align-items-center mt-2">
        <Spinner size="sm" color="dark" />
        <span className="ml-2">Memuat Halaman</span>
      </div>
    </div>
  </div>
);

export { PageLoading };
