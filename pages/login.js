import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";
import { Spinner } from "reactstrap";
import { handleLogin, validateSession, setUserSession } from "../redux/actions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { dataSession } = state.auth;
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isRemember, setIsRemember] = useState(false);
  const [dataPayload, setDataPayload] = useState({});

  const handleChangeRemember = () => {
    setIsRemember(!isRemember);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newDataPayload = { ...dataPayload };
    newDataPayload[name] = value;
    setDataPayload(newDataPayload);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await dispatch(
      handleLogin(dataPayload.email, dataPayload.password, isRemember)
    );
    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      setDataPayload({});
    };
  }, []);

  useEffect(() => {
    if (!dataSession) {
      validateSession()
        .then((dataUser) => {
          dispatch(setUserSession(dataUser));
          push("/layout");
        })
        .catch(() => {
          console.log("error");
        });
    } else {
      push("/layout");
    }
  }, [dataSession]);

  return (
    <div className="login-page">
      <div className="login-page-form">
        <img src="https://yayasankarmel.or.id/wp-content/uploads/2019/03/yayasan-pendidikan-karmel-logo.png" />
        <h5 className="mt-2 mb-0">Selamat datang</h5>
        <small className="text-secondary">Halaman Admin SDK Marga Bhakti</small>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <div className="icon-bar">
              <i className="fa fa-user"></i>
            </div>
            <input
              type="email"
              name="email"
              value={dataPayload.email || ""}
              onChange={handleChange}
              placeholder="Username"
              required
            />
          </div>

          <div className="admin-form-group">
            <div className="icon-bar">
              <i className="fa fa-key"></i>
            </div>
            <input
              type="password"
              name="password"
              value={dataPayload.password || ""}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <div className="d-flex align-items-center mt-4 mb-4">
            <Switch
              onChange={handleChangeRemember}
              onClick={handleChangeRemember}
              className="mr-2"
            />
            <small>Ingat Saya</small>
          </div>
          <button type="submit" className="button">
            {isLoading ? <Spinner size="sm" color="light" /> : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
