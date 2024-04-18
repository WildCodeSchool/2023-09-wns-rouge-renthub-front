import ProductCard from "../cards/ProductCard";
import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const products = [
  {
    id: 1,
    name: "Hannibal 94",
    description: "Great product",
    display: true,
    brandName: "Salomon",
    price: [50, 100, 120],
    src: "/images/products/salomon1.png",
  },
  {
    id: 1,
    name: "Fischer PRO",
    description: "Great product",
    display: true,
    brandName: "Fisher",
    price: [50, 100, 120],
    src: "/images/products/fischer2_mini.png",
  },
  {
    id: 2,
    name: "Hannibal 94",
    description: "Great product",
    display: true,
    brandName: "Salomon",
    price: [50, 100, 120],
    src: "/images/fischer1.png",
  },
  {
    id: 3,
    name: "Hannibal 94",
    description: "Great product",
    display: true,
    brandName: "Salomon",
    price: [50, 100, 120],
    src: "/images/fischer2_mini.png",
  },
  {
    id: 4,
    name: "Hannibal 94",
    description: "Great product",
    display: true,
    brandName: "Salomon",
    price: [50, 100, 120],
    src: "/images/fischer2.png",
  },
  {
    id: 5,
    name: "Hannibal 94",
    description: "Great product",
    display: true,
    brandName: "Salomon",
    price: [50, 100, 120],
    src: "/images/salomon1.png",
  },
  {
    id: 6,
    name: "Hannibal 94",
    description: "Great product",
    display: true,
    brandName: "Salomon",
    price: [50, 100, 120],
    src: "/images/fischer1.png",
  },
  {
    id: 7,
    name: "Hannibal 94",
    description: "Great product",
    display: true,
    brandName: "Salomon",
    price: [50, 100, 120],
    src: "/images/salomon1.png",
  },
  {
    id: 8,
    name: "Hannibal 94",
    description: "Great product",
    display: true,
    brandName: "Salomon",
    price: [50, 100, 120],
    src: "/images/salomon1.png",
  },
];

type CarouselProps = {
  type: string;
};

function Carousel({ type }: CarouselProps) {
  const responsiveHero = {
    xxxxl: {
      breakpoint: { max: 4000, min: 1275 },
      items: 2,
      partialVisibilityGutter: 20,
    },
    xxxl: {
      breakpoint: { max: 1274, min: 1005 },
      items: 1,
      partialVisibilityGutter: 200,
    },
    xxl: {
      breakpoint: { max: 1004, min: 865 },
      items: 1,
      partialVisibilityGutter: 130,
    },
    xl: {
      breakpoint: { max: 864, min: 725 },
      items: 1,
      partialVisibilityGutter: 60,
    },
    l: {
      breakpoint: { max: 724, min: 660 },
      items: 1,
      partialVisibilityGutter: 30,
    },
    m: {
      breakpoint: { max: 659, min: 600 },
      items: 1,
    },
    s: {
      breakpoint: { max: 599, min: 525 },
      items: 2,
      partialVisibilityGutter: 0,
    },
    xs: {
      breakpoint: { max: 524, min: 455 },
      items: 1,
      partialVisibilityGutter: 200,
    },
    xxs: {
      breakpoint: { max: 454, min: 404 },
      items: 1,
      partialVisibilityGutter: 150,
    },
    xxxs: {
      breakpoint: { max: 403, min: 360 },
      items: 1,
      partialVisibilityGutter: 110,
    },
    smallest: {
      breakpoint: { max: 359, min: 0 },
      items: 1,
    },
  };

  const responsive = type === "Hero" ? responsiveHero : {};

  const classNameCarousel = type === "Hero" ? " carousel-hero" : "";

  return (
    <MultiCarousel
      responsive={responsive}
      infinite
      showDots={false}
      partialVisible={type === "Hero" ? true : false}
      keyBoardControl={true}
      containerClass={"carousel-container" + classNameCarousel}
    >
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </MultiCarousel>
  );
}

export default Carousel;
