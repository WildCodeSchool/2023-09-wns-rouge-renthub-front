import * as React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useQuery } from "@apollo/client";
import { SelectChangeEvent } from "@mui/material/Select";
import { ICategory } from "@/types/ICategory";
import { queryAllCatWithHierarchy } from "@/graphql/category/queryAllCatWithHierarchy";
import { FormikProps } from "formik";
import { ProduitFormValues } from "@/types/IProductReference";
import { CategoryFormValues } from "./create/BackOfficeCategoryForm";

type CategorySelectProps = {
  disabled?: boolean;
  selectedCategory: string;
  setSelectedCategory: (selectedCategory: string) => void;
  formik: FormikProps<ProduitFormValues | CategoryFormValues>;
};

const CategorySelect: React.FC<CategorySelectProps> = (
  props: CategorySelectProps,
) => {
  // Get all categories
  const { data } = useQuery<{ items: ICategory[] }>(queryAllCatWithHierarchy);
  const categories = data ? data.items : [];
  // Render categories CSS
  const renderMenuItems = (category: ICategory, level = 0) => {
    const indent = level * 20;
    let fontWeight: string;
    switch (level) {
      case 0:
        fontWeight = "bold";
        break;
      default:
        fontWeight = "normal";
    }

    return [
      <MenuItem
        key={category.id}
        value={category.id}
        style={{ marginLeft: indent, fontWeight: fontWeight }}
      >
        {category.name}
      </MenuItem>,
      category.childCategories?.map((child) =>
        renderMenuItems(child, level + 1),
      ),
    ];
  };
  const handleChange = (event: SelectChangeEvent<string>) => {
    props.setSelectedCategory(event.target.value as string);
    props.formik.setFieldValue("category", { id: event.target.value });
  };
  return (
    <FormControl fullWidth disabled={props.disabled}>
      {/* {props.formik} */}
      <InputLabel size="small" id="category-select-label">
        Catégories
      </InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        size="small"
        value={props.selectedCategory || ""}
        onChange={handleChange}
        label="Catégorie"
        name="category"
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 450,
            },
          },
        }}
      >
        <MenuItem value="" disabled>
          Sélectionnez une catégorie
        </MenuItem>
        {categories.map((category) => renderMenuItems(category))}
      </Select>
    </FormControl>
  );
};
export default CategorySelect;
