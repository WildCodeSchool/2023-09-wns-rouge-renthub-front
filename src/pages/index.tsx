import Home from "@/components/home/Home";
import LayoutFull from "@/components/layout/LayoutFull";

const Index = (): React.ReactNode => {
  return (
    <LayoutFull title="Accueil RentHub">
      <Home />
    </LayoutFull>
  );
};

export default Index;
