import LayoutFull from '@/components/layout/LayoutFull';
import ProductCard from '@/components/cards/ProductCard';
import { Container } from '@mui/material';

const cards = [
  {
    brand: 'Fischer',
    name: 'Hannibal 100',
    alt: 'photo of skies',
    description: 'Great product tatati tatata',
    src: '/images/fischer2_mini.png',
  },
  {
    brand: 'Salomon',
    name: 'Hannibal 94',
    alt: 'photo of snowboard',
    description: 'Great product',
    src: '/images/salomon1.png',
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
          justifyContent: 'flex-end',
          padding: '50px 30px',
        }}
      >
        {cards.map((card, index) => (
          <ProductCard key={index} {...card} />
        ))}
      </Container>
    </LayoutFull>
  );
};

export default Home;
