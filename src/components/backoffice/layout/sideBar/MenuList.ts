import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CategoryIcon from "@mui/icons-material/Category";
import DirectionsSubwayFilledIcon from "@mui/icons-material/DirectionsSubwayFilled";

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
    ],
  },
];
