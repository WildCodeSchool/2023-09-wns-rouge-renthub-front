import { VariablesColors } from "@/styles/Variables.colors";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

export function ColonnesTableUser() {
  const { errorColor } = new VariablesColors();
  const router = useRouter();
  const userColumns: GridColDef[] = useMemo(
    () => [
      {
        field: "firstName",
        headerName: "Prénom",
        valueGetter: (value, row) => row.firstName || "",
        flex: 1,
      },
      {
        field: "lastName",
        headerName: "Last name",
        valueGetter: (value, row) => row.lastName || "",
        flex: 1,
      },
      {
        field: "nickName",
        headerName: "Surnom",
        valueGetter: (value, row) => row.nickName || "",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        valueGetter: (value, row) => row.email || "",
        flex: 1,
      },
      {
        field: "phoneNumber",
        headerName: "Téléphone",
        valueGetter: (value, row) => row.phoneNumber || "",
        flex: 1,
      },
      {
        field: "role",
        headerName: "Rôle",
        valueGetter: (value, row) => row.role.right || "",
        flex: 1,
      },
      {
        field: "lastConnectionDate",
        headerName: "Dernière connexion",
        valueGetter: (value, row) =>
          format(new Date(row.lastConnectionDate), "dd/MM/yyyy") || "",
        flex: 1,
      },
      {
        field: "createdAt",
        headerName: "Créé le",
        flex: 1,
        valueGetter: (value, row) =>
          format(new Date(row.createdAt), "dd/MM/yyyy") || "",
      },
      {
        field: "createdBy",
        headerName: "Créé par",
        valueGetter: (value, row) => {
          const createdBy = row.createdBy;
          if (createdBy) {
            return createdBy.firstName + " " + createdBy.lastName;
          }
          return "";
        },
        flex: 1,
      },
      {
        field: "updatedAt",
        headerName: "Mis à jour le",
        valueGetter: (value, row) =>
          format(new Date(row.updatedAt), "dd/MM/yyyy") || "",
        flex: 1,
      },
      {
        field: "updatedBy",
        headerName: "Mis à jour par",
        valueGetter: (value, row) => {
          const updatedBy = row.updatedBy;
          if (updatedBy) {
            return updatedBy.firstName + " " + updatedBy.lastName;
          }
          return "";
        },
        flex: 1,
      },
      {
        field: "actions",
        type: "actions",
        sortable: false,
        filterable: false,
        flex: 1,
        getActions: (params: GridRowParams) => [
          <GridActionsCellItem
            key={`${params.row.id}-edit`}
            icon={<FaRegEdit style={{ fontSize: "1rem" }} />}
            label="Modifier"
            title="Modifier l'utilisateur"
            onClick={() =>
              router.push(`/renthub-backoffice/user-form/${params.row.id}`)
            }
          />,
          <GridActionsCellItem
            key={`${params.row.id}-delete`}
            icon={
              <RiDeleteBinLine
                style={{ fontSize: "1rem", color: errorColor }}
              />
            }
            label="Supprimer"
            title="Supprimer l'utilisateur"
          />,
        ],
      },
    ],
    [],
  );

  return userColumns;
}
