import BackOfficeUsersList from "@/components/backoffice/users/BackOfficeUsersList";
import AdminProtection from "@/components/backoffice/AdminProtection";

const BackUserListPage = (): React.ReactNode => {
  return (
    <>
      <BackOfficeUsersList />
    </>
  );
};

export default AdminProtection(BackUserListPage);
