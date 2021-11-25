import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
// import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store";

const AdminTable = ({ source }) => {
	const [gridApi, setGridApi] = useState(null);
	const state = useStore((state) => state);
	const navigate = useNavigate();

	const columnDefs = [
		{
			headerName: "Name",
			field: "owner.name",
			flex: 1,
			sortable: true,
			resizable: true,
			filter: "agTextColumnFilter",
			floatingFilter: true,
			onCellClicked: function (e) {
				navigate(`/admin-details/${e.data._id}`);
			},
		},
		{
			headerName: "Activity",
			field: "activity",
			flex: 1,
			sortable: true,
			resizable: true,
		},
		{
			headerName: "Level",
			field: "level",
			flex: 1,
			sortable: true,
			resizable: true,
		},
		{
			headerName: "Status",
			field: "status",
			flex: 1,
			sortable: true,
			resizable: true,
		},
		{
			headerName: "Score",
			field: "score",
			flex: 1,
			sortable: true,
			sort: "desc",
			resizable: true,
		},
	];

	const onGridReady = (params) => {
		setGridApi(params.api);
		// setGridColumnApi(params.columnApi);
	};

	if (state.isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="ag-theme-alpine h-96" style={{ width: "100%" }}>
			<>
				<AgGridReact
					domLayout={"autoHeight"}
					rowData={source}
					columnDefs={columnDefs}
					pagination={true}
					paginationPageSize={10}
					onGridReady={onGridReady}>
					<AgGridColumn field="owner.name" headerName="Name" />
					<AgGridColumn field="activity" headerName="Activity" />
					<AgGridColumn field="level" headerName="Level" />
					<AgGridColumn field="status" headerName="Status" />
					<AgGridColumn field="score" headerName="Score" />
				</AgGridReact>
			</>
		</div>
	);
};

export default AdminTable;
