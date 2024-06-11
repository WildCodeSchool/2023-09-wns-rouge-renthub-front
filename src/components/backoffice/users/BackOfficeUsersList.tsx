import { QUERY_ALL_USERS } from "@/graphql/user/queryAllUsers";
import { UserInterface } from "@/types/UserTypes";
import { useQuery } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme } from "@mui/material";
import { frFR } from "@mui/material/locale";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";

export const dataGridTheme = createTheme(
  {},
  frFR /* French language for the whole grid */,
);

const BackOfficeUsersList = (): React.ReactNode => {
  const { data, loading, error } = useQuery<{ items: UserInterface[] }>(
    QUERY_ALL_USERS,
  );
  console.log(data);
  const userColumns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "Prénom",
      valueGetter: (value, row) => row.firstName,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last name",
      valueGetter: (value, row) => row.lastName,
      flex: 1,
    },
    {
      field: "nickName",
      headerName: "Surnom",
      valueGetter: (value, row) => row.nickName,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      valueGetter: (value, row) => row.email,
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Téléphone",
      valueGetter: (value, row) => row.phoneNumber,
      flex: 1,
    },
    {
      field: "role",
      headerName: "Rôle",
      valueGetter: (value, row) => row.role,
      flex: 1,
    },
    {
      field: "lastConnectionDate",
      headerName: "Dernière connexion",
      valueGetter: (value, row) => row.lastConnectionDate,
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Créé le",
      valueGetter: (value, row) => row.createdAt,
      flex: 1,
    },
    {
      field: "createdBy",
      headerName: "Créé par",
      valueGetter: (value, row) =>
        row.createdBy?.firstName + " " + row.createdBy?.lastName,
      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: "Mis à jour le",
      valueGetter: (value, row) => row.updatedAt,
      flex: 1,
    },
    {
      field: "updatedBy",
      headerName: "Mis à jour par",
      valueGetter: (value, row) =>
        row.updatedBy?.firstName + " " + row.updatedBy?.lastName,
      flex: 1,
    },
  ];

  return (
    <ThemeProvider theme={dataGridTheme}>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data?.items || []}
          columns={userColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Box>
    </ThemeProvider>
  );
};

export default BackOfficeUsersList;
