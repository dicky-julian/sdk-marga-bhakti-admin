import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../redux/actions";
import { routeList } from "../../services/dummy";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { route, push } = useRouter();

  return (
    <div className="main-header">
      <div className="main-header-breadcrumb">
        <Link href="/">
          <a className="active">Halaman Admin</a>
        </Link>
        {route &&
          route.split("/").length > 1 &&
          route.split("/").map((pathname, index) => (
            <div className="d-flex" key={index}>
              {index ? (
                <>
                  <span>/</span>
                  <span className="text-capitalize">{routeList[pathname]}</span>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
      </div>
      <div className="main-header-tools">
        <Link href="/profil">
          <a>
            <i className="fas fa-user"></i>
          </a>
        </Link>
        <div
          className="d-flex align-items-center"
          onClick={() => {
            dispatch(handleLogout());
            push("/login");
          }}
        >
          <i className="fas fa-sign-out-alt mr-1" style={{ fontSize: 18 }}></i>
        </div>
      </div>
    </div>
  );
};
