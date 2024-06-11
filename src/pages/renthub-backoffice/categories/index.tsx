import AdminProtection from "@/components/backoffice/AdminProtection";
import BackOfficeCategoriesList from "@/components/backoffice/categories/BackOfficeCategoriesList";
const BackOfficeCategories = (): React.ReactNode => {
  return (
    <>
      <BackOfficeCategoriesList />
    </>
  );
};

export default AdminProtection(BackOfficeCategories);
