import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CategoryIcon from "@mui/icons-material/Category";
import AddIcon from "@mui/icons-material/Add";

export const menuItems = [
  {
    id: "users",
    text: "Gestion des utilisateurs",
    icon: AccountBoxIcon,
    subMenus: [
      {
        id: "users-list",
        text: "Utilisateurs",
        icon: AssignmentIndIcon,
        href: "/renthub-backoffice/users-list",
      },
      {
        id: "users-roles",
        text: "Rôles",
        icon: AssignmentIcon,
        href: "/renthub-backoffice/users-roles",
      },
    ],
  },
  {
    id: "categories",
    text: "Gestion des catégories",
    icon: CategoryIcon,
    subMenus: [
      {
        id: "categories-list",
        text: "Catégories",
        icon: CategoryIcon,
        href: "/renthub-backoffice/categories",
      },
      {
        id: "categories-create",
        text: "Créer une catégorie",
        icon: AddIcon,
        href: "/renthub-backoffice/categories/new",
      },
    ],
  },
];
