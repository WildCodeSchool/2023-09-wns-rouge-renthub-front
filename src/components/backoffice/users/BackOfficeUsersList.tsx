import { QUERY_ALL_USERS } from "@/graphql/user/queryAllUsers";
import { UserInterface } from "@/types/UserTypes";
import { useQuery } from "@apollo/client";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme } from "@mui/material";
import { frFR } from "@mui/x-data-grid/locales";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ColonnesTableUser } from "./ColonnesTableUser";

export const dataGridTheme = createTheme(
  {},
  frFR /* French language for the whole grid */,
);
const BackOfficeUsersList = (): React.ReactNode => {
  const { data } = useQuery<{ items: UserInterface[] }>(QUERY_ALL_USERS);

  const userColumns = ColonnesTableUser();

  return (
    <ThemeProvider theme={dataGridTheme}>
      <Box sx={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={data?.items || []}
          columns={userColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
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
          loading={!data}
        />
      </Box>
    </ThemeProvider>
  );
};

export default BackOfficeUsersList;
