import AdminProtection from "@/components/backoffice/AdminProtection";
const BackOfficeUsersRolesPage = (): React.ReactNode => {
  return (
    <>
      <h1>{`OMG! I'm so excited to see what you're going to build here!`}</h1>
    </>
  );
};

export default AdminProtection(BackOfficeUsersRolesPage);
