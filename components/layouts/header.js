import { useEffect, useState } from "react";

const dataHeader = [
  {
    caption: "We Ensure Better Education for a Better World",
    img:
      "https://images.pexels.com/photos/5905881/pexels-photo-5905881.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    caption: "The Roots of Education are Bitter, But the Fruit is Sweet",
    img:
      "https://images.pexels.com/photos/3401403/pexels-photo-3401403.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    caption: "The Great Aim of Education is not Knowledge, But Action",
    img:
      "https://images.pexels.com/photos/5149627/pexels-photo-5149627.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

const Header = () => {
  const [indexHeader, setIndexHeader] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (dataHeader) {
        if (indexHeader >= dataHeader.length - 1) {
          setIndexHeader(0);
        } else {
          setIndexHeader(indexHeader + 1);
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  });

  return (
    <header
      className="header"
      style={{
        backgroundImage: `url(${dataHeader[indexHeader].img})`,
      }}
    >
      <div className="carousel-content">
        <h1 className="text-poppins text-light text-uppercase font-weight-bold">
          {dataHeader[indexHeader].caption}
        </h1>
        <button className="btn btn-primary mt-3">Telusuri</button>
      </div>

      <div className="carousel-toggle">
        {dataHeader &&
          dataHeader.map((data, index) => (
            <div
              onClick={() => setIndexHeader(index)}
              className={`carousel-dot ${
                index === indexHeader ? "active" : ""
              }`}
              key={index}
            >
              <div></div>
            </div>
          ))}
      </div>
    </header>
  );
};

const SubHeader = ({ title, image }) => (
  <header
    className="sub-header"
    style={{
      backgroundImage: `linear-gradient(rgb(0 0 0 / 25%), rgb(0 0 0 / 30%)),url(${image})`,
    }}
  >
    <h1>{title}</h1>
    <span className="line-bottom mt-2"></span>
  </header>
);

export { Header, SubHeader };
