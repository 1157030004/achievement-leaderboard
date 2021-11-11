import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Table = ({ source }) => {
	const [data, setData] = useState(null);
	const [gridApi, setGridApi] = useState(null);

	const columnDefs = [
		{
			headerName: "Name",
			field: "name",
			flex: 2,
			sortable: true,
			resizeable: true,
			filter: "agTextColumnFilter",
			floatingFilter: true,
			onCellClicked: function (event) {
				console.log(event.data.name);
			},
		},
		{
			headerName: "Academic",
			field: "academicScore",
			flex: 1,
			sortable: true,
			resizeable: true,
		},
		{
			headerName: "Organization",
			field: "organizationScore",
			flex: 1,
			sortable: true,
			resizeable: true,
		},
		{
			headerName: "Competition",
			field: "competitionScore",
			flex: 1,
			sortable: true,
			resizeable: true,
		},
		{
			headerName: "Total",
			field: "totalScore",
			flex: 1,
			sortable: true,
			sort: "desc",
			resizeable: true,
		},
		{
			headerName: "Rank",
			field: "rank",
			flex: 1,
			sortable: true,
			resizeable: true,
		},
	];
	const rowData = [
		{
			name: "Toyota",
			academicScore: 5,
			organizationScore: 3,
			competitionScore: 10,
			totalScore: 18,
			rank: 3,
		},
		{
			name: "Ford",
			academicScore: 10,
			organizationScore: 3,
			competitionScore: 10,
			totalScore: 23,
			rank: 2,
		},
		{
			name: "Porsche",
			academicScore: 15,
			organizationScore: 7,
			competitionScore: 10,
			totalScore: 32,
			rank: 1,
		},
	];

	useEffect(() => {
		fetch("https://leaderboard-api.salmanitb.com/api/users/rank")
			.then((res) => res.json())
			.then((saus) => setData(saus.data));
		// setData(rowData);
	}, []);

	const onGridReady = (params) => {
		setGridApi(params.api);
		// setGridColumnApi(params.columnApi);
	};

	const onBtnExport = () => {
		gridApi.exportDataAsCsv();
	};

	return (
		<div className="ag-theme-alpine h-96" style={{ width: "100%" }}>
			<div className="my-2">
				<button
					className="btn btn-primary btn-sm px-4 py-2 d hover:pointer"
					onClick={() => onBtnExport()}>
					Export to Csv
				</button>
			</div>
			<AgGridReact
				rowData={data}
				columnDefs={columnDefs}
				pagination={true}
				paginationPageSize={20}
				onGridReady={onGridReady}>
				<AgGridColumn field="name" headerName="Name" />
				<AgGridColumn field="academicScore" headerName="Academic Score" />
				<AgGridColumn
					field="organizationScore"
					headerName="Organization Score"
				/>
				<AgGridColumn field="competitionScore" headerName="Competition Score" />
				<AgGridColumn field="totalScore" headerName="Total Score" />
			</AgGridReact>
		</div>
	);
};

export default Table;
