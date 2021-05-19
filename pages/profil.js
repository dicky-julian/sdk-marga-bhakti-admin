import { useEffect } from "react";
import { useSelector } from "react-redux";
import { PageLoading } from "../components/layouts";

const headerImg =
  "https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const profileImg =
  "https://www.cosmopolitan.co.id/newtest/vrgallery/teaser/rsz_75516654_447782205860059_220253201168768836_n_69_201910281157258ClnBX.jpg";

const ProfilePage = () => {
  const state = useSelector((state) => state);
  const { dataSession } = state.auth;
  const { dataReference } = state.reference;

  return (
    <div className="profile-page">
      {dataSession && dataReference && dataReference.role ? (
        <div
          className="profile-header"
          style={{ backgroundImage: `url(${headerImg})` }}
        >
          <div className="profile-header-card">
            <div className="data-profile-container">
              <img src={dataSession.photoURL} />
              <div className="ml-3">
                <h6 className="mb-0 font-weight-bold">
                  {dataSession.displayName}
                </h6>
                <small>{dataReference.role[dataSession.role]}</small>
              </div>
            </div>
            <div className="data-action-container">
              <div>
                <div>
                  <small>Artikel Dibuat</small>
                  <h6 className="font-weight-bold">04</h6>
                </div>
                <div className="icon-bar">
                  <i className="far fa-newspaper"></i>
                </div>
              </div>

              <div>
                <div>
                  <small>Kegiatan Dibuat</small>
                  <h6 className="font-weight-bold">13</h6>
                </div>
                <div className="icon-bar">
                  <i className="far fa-calendar"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageLoading />
      )}
    </div>
  );
};

export default ProfilePage;
