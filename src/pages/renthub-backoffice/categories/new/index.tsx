import BackOfficeCategoryForm from "@/components/backoffice/categories/create/BackOfficeCategoryForm";
import AdminProtection from "@/components/backoffice/AdminProtection";

const CreateCategoriesPage = (): React.ReactNode => {
  return (
    <>
      <BackOfficeCategoryForm />
    </>
  );
};

export default AdminProtection(CreateCategoriesPage);
