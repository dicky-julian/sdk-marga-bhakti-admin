const Table = (props) => {
  const { title } = props;
  return (
    <div className="data-table">
      <div className="data-table-header">
        <h6>{title}</h6>
      </div>

      <table className="data-table-body">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Deskripsi</th>
            <th>Tempat</th>
            <th>Pengunggah</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((data, index) => (
            <tr key={index}>
              <td>USA, International Triathlon Event</td>
              <td style={{ minWidth: 225 }}>
                Sed ut perspiciatis unde grid ombnis iste natus error sit
                voluptatem accusantium doloremque ...
              </td>
              <td>18/07/2002</td>
              <td>Dicky Julian Pratama</td>
              <td>
                <div className="tab-action">
                  <button className="btn-edit">
                    <i className="fas fa-pen"></i>
                  </button>
                  <button className="btn-delete ml-1">
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="data-table-footer">
        <span>Menampilkan 1 dari 13 Halaman</span>
        <div className="data-table-pagintaion">
          <button>
            <i className="fa fa-chevron-left"></i>
          </button>
          <button className="active">1</button>
          <button>2</button>
          <button>...</button>
          <button>
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export { Table };
