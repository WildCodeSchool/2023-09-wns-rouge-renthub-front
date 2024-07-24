import * as React from "react";
import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { ICategory } from "@/types/ICategory";

type CategoryDataGridProps = {
  categories?: ICategory[];
};

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nom",
    width: 200,
    renderCell: (params) => (
      <div style={{ marginLeft: params.row.parent ? 20 : 0 }}>
        {params.value}
      </div>
    ),
  },
  { field: "parent", headerName: "Catégorie parente", width: 200 },
];

const rows = [
  { id: 1, name: "Tech", parent: null },
  { id: 2, name: "Computer", parent: "1" },
  { id: 8, name: "Off road", parent: "5" },
  { id: 3, name: "Mobile", parent: "1" },
  { id: 4, name: "TV", parent: "1" },
  { id: 5, name: "Cars", parent: null },
  { id: 6, name: "Race", parent: "5" },
  { id: 7, name: "SUV", parent: "5" },
  { id: 9, name: "Bikes", parent: null },
  { id: 10, name: "Mountain", parent: "9" },
  { id: 11, name: "City", parent: "9" },
];

function CategoryDataGrid() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGridPro
        rows={rows}
        columns={columns}
        treeData
        getTreeDataPath={(row) => [row.id]}
        getRowId={(row) => row.id}
        groupingColDef={{
          headerName: "Catégorie",
          renderCell: (params) => (
            <div style={{ marginLeft: params.row.parent ? 20 : 0 }}>
              {params.value}
            </div>
          ),
        }}
      />
    </div>
  );
}

export default CategoryDataGrid;
