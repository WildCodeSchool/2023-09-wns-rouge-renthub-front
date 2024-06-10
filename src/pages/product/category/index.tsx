import { GET_CATEGORY_PRODUCT } from "@/graphql/queryCategoryWithProducts";
import { ICategory } from "@/types/ICategory";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React from "react";

function Index(): React.ReactNode {
  const router = useRouter();
  const route = router.route;
  // const { categoryId } = router.query;
  console.debug("categoryId", router);
  // const { data, loading, error } = useQuery<{ item: ICategory }>(
  //   GET_CATEGORY_PRODUCT,
  //   { variables: { findCategoryId: categoryId } },
  // );

  // const sortedProducts = data
  //   ? [...data.item?.productReference].sort((a, b) => {
  //       return a.name.localeCompare(b.name);
  //     })
  //   : [];
  // return (
  //   <div>
  //     <h1>List of products</h1>
  //     <ul>
  //       {sortedProducts &&
  //         sortedProducts?.map((product) => (
  //           <li key={product.id}>
  //             <a href={`/pages/product/${product.id}`}>{product.name}</a>
  //           </li>
  //         ))}
  //     </ul>
  //   </div>
  // );
  return <div>list of products </div>;
}
export default Index;
