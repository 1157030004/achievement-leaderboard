import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useAuthStore, useStore } from "../store";
import Loading from "./Loading";

const Table = () => {
  const state = useStore((state) => state);
  const isAdmin = useAuthStore((state) => state.user.isAdmin);
  const rank = useStore((state) => state.rank);
  const getRank = useStore((state) => state.getRank);
  const [gridApi, setGridApi] = useState(null);

  const columnDefs = [
    {
      headerName: "Name",
      field: "name",
      flex: 2,
      sortable: true,
      resizable: true,
      filter: "agTextColumnFilter",
      floatingFilter: true,
      onCellClicked: function (event) {
        console.log(event.data.name);
      },
    },
    {
      headerName: "Email",
      field: "email",
      flex: 2,
      sortable: true,
      resizable: true,
      hide: !isAdmin && true,
    },
    {
      headerName: "Academic",
      field: "academicScore",
      flex: 1,
      sortable: true,
      resizable: true,
    },

    {
      headerName: "Competition",
      field: "competitionScore",
      flex: 1,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Organization",
      field: "organizationScore",
      flex: 1,
      sortable: true,
      resizable: true,
    },
    {
      headerName: "Total",
      field: "totalScore",
      flex: 1,
      sortable: true,
      sort: "desc",
      resizable: true,
    },
    {
      headerName: "Rank",
      field: "rank",
      flex: 1,
      sortable: true,
      resizable: true,
    },
  ];

  useEffect(() => {
    getRank();
  }, []);

  const onGridReady = (params) => {
    setGridApi(params.api);
    // setGridColumnApi(params.columnApi);
  };

  const onBtnExport = () => {
    gridApi.exportDataAsCsv();
  };

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="ag-theme-alpine mb-5" style={{ width: "100%" }}>
      {isAdmin ? (
        <div className="my-2">
          <button
            className="btn btn-primary btn-sm px-4 py-2 d hover:pointer"
            onClick={() => onBtnExport()}
          >
            Export to Csv
          </button>
        </div>
      ) : null}
      <AgGridReact
        domLayout={"autoHeight"}
        rowData={rank.data}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
        onGridReady={onGridReady}
      >
        <AgGridColumn field="name" headerName="Name" />
        <AgGridColumn field="email" headerName="Email" />
        <AgGridColumn field="academicScore" headerName="Academic Score" />
        <AgGridColumn field="competitionScore" headerName="Competition Score" />
        <AgGridColumn
          field="organizationScore"
          headerName="Organization Score"
        />

        <AgGridColumn field="totalScore" headerName="Total Score" />
      </AgGridReact>
    </div>
  );
};

export default Table;
