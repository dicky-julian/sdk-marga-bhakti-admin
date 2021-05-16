import { useEffect, useState } from "react";
import { Button } from "reactstrap";

const Table = (props) => {
  const { title, data, dataField, action } = props;
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const showedData = searchResult || data;

  const handleSearchData = () => {
    const { data, dataField } = props;
    const selectedData = [];

    data.map((dataTable) => {
      dataField.map(({ field }) => {
        let result;
        if (!result && typeof dataTable[field] === "string") {
          const data_field = dataTable[field].toLowerCase();
          const data_keyword = searchKeyword.toLowerCase();
          if (data_field.includes(data_keyword)) {
            result = dataTable;
          }
          if (result) selectedData.push(result);
        }
      });
    });

    setSearchResult(selectedData);
  };

  useEffect(() => {
    if (searchKeyword && searchKeyword.length > 2) {
      handleSearchData();
    } else if (!searchKeyword) {
      setSearchResult(null);
    }
  }, [searchKeyword]);

  useEffect(() => {
    return () => {
      setSearchKeyword(null);
    };
  }, []);

  return (
    <div className="data-table">
      <div className="data-table-header">
        <h6>{title}</h6>
        <div className="data-table-action">
          <div className="form-search">
            <input
              className={searchToggle ? "active" : ""}
              placeholder={`Cari ${title} ...`}
              value={searchKeyword || ""}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              className="btn-dark ml-1"
              onClick={() => setSearchToggle(!searchToggle)}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
          {Boolean(action && action.add) && (
            <Button
              size="md"
              color="dark"
              onClick={() => action.add()}
              className="ml-1"
            >
              <i className="fas fa-plus mr-1"></i> Tambah
            </Button>
          )}
        </div>
      </div>

      <table className="data-table-body">
        <thead>
          <tr>
            {dataField.map(({ title }, index) => (
              <th key={index}>{title}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {showedData.map((dataTable, index) => (
            <tr key={index}>
              {dataField.map(({ field }, fieldIndex) => (
                <td key={fieldIndex}>{dataTable[field]}</td>
              ))}
              <td>
                <div className="tab-action">
                  <button
                    className="btn-edit"
                    onClick={() => action.edit(dataTable, index)}
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                  <button
                    className="btn-delete ml-1"
                    onClick={() => action.delete(index)}
                  >
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
