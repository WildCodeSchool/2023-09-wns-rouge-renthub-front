import ProductCard from '@/components/cards/ProductCard';
import LayoutFull from '@/components/layout/LayoutFull';
import { Container } from '@mui/material';

const products = [
  {
    id: 1,
    name: 'Hannibal 100',
    description: 'Great product tatati tatata ',
    display: true,
    brandName: 'Fischer',
    price: 50,
    src: '/images/fischer2_mini.png',
  },
  {
    id: 2,
    name: 'Hannibal 94',
    description: 'Great product',
    display: true,
    brandName: 'Salomon',
    price: [50, 100, 120],
    src: '/images/salomon1.png',
  },
  {
    id: 3,
    name: 'Hannibal Pro',
    description: 'Great product',
    display: true,
    brandName: 'Fischer',
    price: 160,
    src: '/images/fischer2_mini.png',
  },
];

const Home = (): React.ReactNode => {
  return (
    <LayoutFull title="Accueil RentHub">
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: '#dfdfdf',
          display: 'flex',
          gap: '20px',
          flex: 'stretch',
          justifyContent: 'flex-end',
          padding: '50px 30px',
        }}
      >
        {products.map((card, index) => (
          <ProductCard key={index} {...card} />
        ))}
      </Container>
    </LayoutFull>
  );
};

export default Home;
