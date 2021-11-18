import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useStore } from "../store";

const Table = ({ source }) => {
	const state = useStore((state) => state);
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
			headerName: "Academic",
			field: "academicScore",
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
			headerName: "Competition",
			field: "competitionScore",
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
	}, [rank.data]);

	const onGridReady = (params) => {
		setGridApi(params.api);
		// setGridColumnApi(params.columnApi);
	};

	const onBtnExport = () => {
		gridApi.exportDataAsCsv();
	};

	return (
		<div className="ag-theme-alpine h-96" style={{ width: "100%" }}>
			{state.isLoading ? (
				<div>loading</div>
			) : (
				<>
					<div className="my-2">
						<button
							className="btn btn-primary btn-sm px-4 py-2 d hover:pointer"
							onClick={() => onBtnExport()}>
							Export to Csv
						</button>
					</div>
					<AgGridReact
						rowData={rank.data}
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
						<AgGridColumn
							field="competitionScore"
							headerName="Competition Score"
						/>
						<AgGridColumn field="totalScore" headerName="Total Score" />
					</AgGridReact>
				</>
			)}
		</div>
	);
};

export default Table;
