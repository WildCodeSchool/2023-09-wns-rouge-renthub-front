import * as React from "react";
// import { DataGridPro, GridColDef } from "@mui/x-data-grid-pro";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Définition du type des données des catégories
type ICategory = {
  id: string | number;
  name: string;
  index: number;
  display: boolean;
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string | null;
  childCategories: Partial<ICategory>[];
  parentCategory: Partial<ICategory> | null;
};
type CategoryDataGridProps = {
  categories: ICategory[];
};

// Définition des colonnes pour le DataGridPro
const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nom",
    width: 200,
    renderCell: (params) => (
      <div style={{ marginLeft: params.row.depth * 20 }}>{params.value}</div>
    ),
  },
  { field: "parent", headerName: "Catégorie parente", width: 200 },
];

// Fonction pour transformer les données en une structure aplatie avec profondeur
const transformData = (data, parentId = null, depth = 0) => {
  let result = [];
  data.forEach((item) => {
    result.push({
      id: item.id,
      name: item.name,
      parent: parentId,
      depth,
    });
    if (item.childCategories && item.childCategories.length > 0) {
      result = result.concat(
        transformData(item.childCategories, item.id, depth + 1),
      );
    }
  });
  return result;
};

// Données d'exemple
const categoriesData: ICategory[] = [
  {
    id: 5,
    name: "Cars",
    index: 1,
    display: true,
    createdBy: "0",
    updatedBy: null,
    createdAt: "2024-05-16T15:31:38.945Z",
    updatedAt: "2024-05-16T15:31:38.949Z",
    parentCategory: null,
    childCategories: [
      {
        name: "Race",
        index: 1,
        id: 6,
        childCategories: [
          {
            name: "Formula 1",
            index: 1,
            id: 9,
          },
          {
            name: "Nascar",
            index: 1,
            id: 10,
          },
        ],
      },
      {
        name: "SUV",
        index: 1,
        id: 7,
      },
      {
        name: "Off road",
        index: 1,
        id: 8,
      },
    ],
  },
];

// Ajoutez d'autres éléments ici si nécessaire

// Transformation des données
const rows = transformData(categoriesData);

export default function CategoryDataGrid({
  categories,
}: CategoryDataGridProps): React.ReactNode {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // treeData
        // getTreeDataPath={(row) => [row.parent, row.id]}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
