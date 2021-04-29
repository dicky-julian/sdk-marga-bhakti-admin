const Pagination = (props) => {
  const { item, index, itemPerPage, onIndexChange, className } = props;

  return (
    <div className={`pagination-page ${className || ""}`}>
      <div>
        <p className="text-secondary">Menampilkan 1 dari 13 Halaman</p>
      </div>
      <div className="d-flex">
        <button>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>...</button>
        <button>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export { Pagination };
