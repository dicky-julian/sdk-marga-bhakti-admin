import { useState } from "react";
import Switch from "rc-switch";
import "rc-switch/assets/index.css";

const LoginPage = () => {
  const [isRemember, setIsRemember] = useState(false);

  const handleChangeRemember = () => {
    setIsRemember(!isRemember);
  };

  return (
    <div className="login-page">
      <div className="login-page-form">
        <img src="https://yayasankarmel.or.id/wp-content/uploads/2019/03/yayasan-pendidikan-karmel-logo.png" />
        <h5 className="mt-2 mb-0">Selamat datang</h5>
        <small className="text-secondary">Halaman Admin SDK Marga Bhakti</small>
        <form className="mt-4">
          <div className="admin-form-group">
            <div className="icon-bar">
              <i className="fa fa-user"></i>
            </div>
            <input placeholder="Username" />
          </div>

          <div className="admin-form-group">
            <div className="icon-bar">
              <i className="fa fa-key"></i>
            </div>
            <input type="password" placeholder="Password" />
          </div>

          <div className="d-flex align-items-center mt-4 mb-4">
            <Switch
              onChange={handleChangeRemember}
              onClick={handleChangeRemember}
              className="mr-2"
            />
            <small>Ingat Saya</small>
          </div>
          <button className="button">Masuk</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
