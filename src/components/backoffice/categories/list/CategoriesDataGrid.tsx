import React, { useMemo, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { format } from "date-fns";
import { ICategory } from "@/types/ICategory";
import { Box, Typography } from "@mui/material";
import { VariablesColors } from "@/styles/Variables.colors";
import router from "next/router";

const colors = new VariablesColors();
const { successColor, errorColor, orangeColor } = colors;

type CategoryDataGridProps = {
  categories: ICategory[];
};

const CategoryDataGrid: React.FC<CategoryDataGridProps> = ({ categories }) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    pageSize: 10,
    page: 0,
  });
  const rows = categories.map((category) => ({
    id: category.id,
    name: category.name,
    parentCategory: category.parentCategory,
    childCategories: category.childCategories,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    display: category.display,
  }));

  const handleEditClick = (id: string) => {
    router.push(`/renthub-backoffice/categories/edit/${id}`);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Nom", width: 150, sortable: true },
      {
        field: "parentCategory",
        headerName: "Catégorie parente",
        width: 250,
        sortable: true,
        renderCell: (params: GridRenderCellParams) =>
          params.row?.parentCategory ? params.row.parentCategory.name : "-",
      },
      {
        field: "childCategories",
        headerName: "Catégories enfants",
        width: 250,
        renderCell: (params: GridRenderCellParams) =>
          params.row?.childCategories.length > 0 ? (
            <Box>
              {params.row.childCategories.map(
                (child: ICategory, index: number) => (
                  <Typography variant="caption" key={child.id}>
                    {child.name}
                    {index < params.row.childCategories.length - 1 ? " - " : ""}
                  </Typography>
                ),
              )}
            </Box>
          ) : (
            "-"
          ),
      },
      {
        field: "createdAt",
        headerName: "Création",
        width: 180,
        renderCell: (params: GridRenderCellParams) =>
          params.row?.createdAt
            ? format(new Date(params.row.createdAt), "dd/MM/yyyy HH:mm")
            : "-",
      },
      {
        field: "updatedAt",
        headerName: "Modification",
        width: 180,
        renderCell: (params: GridRenderCellParams) =>
          params.row?.updatedAt
            ? format(new Date(params.row.updatedAt), "dd/MM/yyyy HH:mm")
            : "-",
      },
      {
        field: "display",
        headerName: "En ligne",
        width: 120,
        renderCell: (params: GridRenderCellParams) =>
          params.value ? (
            <CheckCircleIcon
              style={{ color: successColor, marginTop: "15px" }}
            />
          ) : (
            <CancelIcon style={{ color: errorColor, marginTop: "15px" }} />
          ),
      },
      {
        field: "actions",
        headerName: "Action",
        width: 150,
        renderCell: (params: GridRenderCellParams) =>
          params.row ? (
            <>
              <GridActionsCellItem
                icon={<EditIcon style={{ color: orangeColor }} />}
                label="Edit"
                className="textPrimary"
                onClick={() => handleEditClick(params.id.toString())}
                color="inherit"
              />
              <GridActionsCellItem
                icon={<DeleteIcon style={{ color: errorColor }} />}
                label="Delete"
                color="inherit"
              />
            </>
          ) : null,
      },
    ],
    [successColor, errorColor, orangeColor],
  );

  return (
    <Box style={{ height: 631, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        checkboxSelection
      />
    </Box>
  );
};

export default CategoryDataGrid;
