import Image from "next/image";
import { Spinner } from "reactstrap";

const PageLoading = ({ style = {} }) => (
  <div className="loading-page" style={style}>
    <div className="d-flex flex-column align-items-center">
      <Image alt="SDK Marga Bhakti" src="/icon.png" width={75} height={75} />
      <div className="d-flex align-items-center mt-2">
        <Spinner size="sm" color="dark" />
        <span className="ml-2">Memuat Halaman</span>
      </div>
    </div>
  </div>
);

export { PageLoading };
