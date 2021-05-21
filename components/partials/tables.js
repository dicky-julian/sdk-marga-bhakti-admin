import { useEffect, useState } from "react";
import { Button } from "reactstrap";

const Table = (props) => {
  const { title, data, dataField, action } = props;
  const [searchToggle, setSearchToggle] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [paginationIndex, setPaginationIndex] = useState(1);
  const [paginationLength, setPaginationLength] = useState(0);

  const tableConfig = {
    itemPerPage: 5,
  };

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

    setPaginationIndex(1);
    setSearchResult(selectedData);
  };

  const handlePaginateData = () => {
    const numberOfPage = Math.ceil(showedData.length / tableConfig.itemPerPage);
    if (numberOfPage && numberOfPage < paginationIndex) {
      setPaginationIndex(numberOfPage);
    }
    setPaginationLength(numberOfPage);
  };

  useEffect(() => {
    if (showedData) handlePaginateData();
  }, [showedData]);

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
          {showedData.map((dataTable, index) => {
            if (
              index >= tableConfig.itemPerPage * (paginationIndex - 1) &&
              index < tableConfig.itemPerPage * paginationIndex
            ) {
              return (
                <tr key={index}>
                  {dataField.map(
                    ({ field, fieldType, option, style }, fieldIndex) => (
                      <td key={fieldIndex} style={style || {}}>
                        {fieldType === "image" ? (
                          <img
                            src={dataTable[field]}
                            className="data-table-image"
                          />
                        ) : option ? (
                          <span className="custom-badge custom-badge-primary">
                            {option[dataTable[field]]}
                          </span>
                        ) : (
                          dataTable[field]
                        )}
                      </td>
                    )
                  )}
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
              );
            }
          })}
        </tbody>
      </table>
      <div className="data-table-footer">
        <span>
          Menampilkan {paginationIndex} dari {paginationLength} Halaman
        </span>
        <div className="data-table-pagintaion">
          <button
            disabled={paginationLength === 1}
            onClick={() => setPaginationIndex(1)}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
          {Array.apply(null, { length: paginationLength }).map(
            (data, index) => {
              if (index >= paginationIndex - 2 && index <= paginationIndex) {
                return (
                  <button
                    className={`${
                      index + 1 === paginationIndex ? "active" : ""
                    }`}
                    onClick={() => setPaginationIndex(index + 1)}
                    key={index}
                  >
                    {index + 1}
                  </button>
                );
              }
            }
          )}
          {paginationLength > 3 && <button>...</button>}
          <button
            disabled={paginationIndex === paginationLength}
            onClick={() => setPaginationIndex(paginationIndex + 1)}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export { Table };
