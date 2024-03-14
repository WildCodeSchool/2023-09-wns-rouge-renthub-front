import { Container } from '@mui/material';
import ProductCard from '../cards/ProductCard';

const products = [
  {
    id: 1,
    name: 'Hannibal 94',
    description: 'Great product',
    display: true,
    brandName: 'Salomon',
    price: [50, 100, 120],
    src: '/images/salomon1.png',
  },
];

function Carousel() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        // backgroundColor: '#dfdfdf',
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
  );
}

export default Carousel;
