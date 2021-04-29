import { useEffect, useState } from "react";
// import {
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";
import Link from "next/link";

const Navbar = () => {
  const [isNavToggle, setIsNavToggle] = useState(false);
  const [indexScroll, setIndexScroll] = useState(0);
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleScroll = () => {
    setIndexScroll(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <nav
      className={`${indexScroll > 100 ? "inscroll" : ""} ${
        isNavToggle ? "active" : ""
      }`}
    >
      {/* NAVIGATION BAR - ADDON */}
      <div className="navbar-addon">
        <div>
          <div className="h-100">
            <small>+62 812 5264 1762</small>
          </div>
          <div>
            <div>
              <i className="fab fa-facebook-f"></i>
            </div>
            <div>
              <i className="fab fa-instagram"></i>
            </div>
            <div>
              <i className="fab fa-whatsapp"></i>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION BAR - NAV LINK */}
      <div className="navbar-container">
        <div className="navbar-img">
          <img src="https://yayasankarmel.or.id/wp-content/uploads/2019/03/yayasan-pendidikan-karmel-logo.png" />
          <div className="ml-3">
            <small>SDK MARGA BHAKTI</small>
            <small>MALANG</small>
          </div>
        </div>
        <div
          className={`navbar-link ${isNavToggle ? "active" : ""} ${
            indexScroll < 100 ? "inscroll" : ""
          }`}
        >
          <Link href="/">
            <a>Beranda</a>
          </Link>
          <Link href="/kegiatan">
            <a>Kegiatan</a>
          </Link>
          <Link href="/artikel">
            <a>Artikel</a>
          </Link>
          <Link href="/tentang">
            <a>Tentang Kami</a>
          </Link>
          {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle tag="a" caret>
              Tentang Kami
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link href="/tentang/visi-misi">
                  <a className="ml-0 p-1">Visi & Misi</a>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/tentang/struktur-organisasi">
                  <a className="ml-0 p-1">Struktur Organisasi</a>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link href="/tentang/sejarah">
                  <a className="ml-0 p-1">Sejarah</a>
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
        </div>
        <div
          className={`hamburger ${isNavToggle ? "active" : ""}`}
          onClick={() => setIsNavToggle(!isNavToggle)}
        >
          <div className="hamburger-bar"></div>
          <div className="hamburger-bar"></div>
          <div className="hamburger-bar"></div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
