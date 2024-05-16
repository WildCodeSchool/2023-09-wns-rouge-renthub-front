import BackOfficeDashboard from "@/components/backoffice/dashboard/BackOfficeDashboard";
import AdminProtection from "@/components/backoffice/AdminProtection";

const BackOfficePage = (): React.ReactNode => {
  return (
    <>
      <BackOfficeDashboard />
    </>
  );
};

export default AdminProtection(BackOfficePage);
