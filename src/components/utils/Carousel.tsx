import { useMediaQuery } from "@mui/material";
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
      breakpoint: { max: 4000, min: 1200 },
      items: 1,
      partialVisibilityGutter: 150,
    },
    xxxl: {
      breakpoint: { max: 1199, min: 1005 },
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

  const responsiveTopLocation = {
    largeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1199, min: 801 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 800, min: 745 },
      items: 1,
      partialVisibilityGutter: 250,
    },
    mobile: {
      breakpoint: { max: 744, min: 650 },
      items: 1,
      partialVisibilityGutter: 180,
    },
    small: {
      breakpoint: { max: 649, min: 465 },
      items: 1,
      partialVisibilityGutter: 100,
    },
    extraSmall: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 50,
    },
  };

  const matchSize800 = useMediaQuery("(max-width:800px)");

  const responsive =
    type === "TopLocations"
      ? responsiveTopLocation
      : type === "Hero"
        ? responsiveHero
        : {};

  const classNameCarousel =
    type === "Hero"
      ? " carousel-hero"
      : type === "TopLocations"
        ? " carousel-top-locations"
        : "";

  return (
    <MultiCarousel
      responsive={responsive}
      infinite
      showDots={false}
      partialVisible={type === "Hero" || matchSize800 ? true : false}
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
