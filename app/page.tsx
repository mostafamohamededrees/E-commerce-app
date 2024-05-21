export const revalidate = 0;

import Container from "./components/Container";
import HomeBanner from "./components/Nav/HomeBanner";
import ProductCard from "./components/Products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface HomeProps {
  searchParams: IProductParams;
}


export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);




  if (products.length === 0) {
    return (
      <NullData title="Oops! No Products Found click'All'to clear filter" />
    );
  }

  // shuffle products to get random products on home page every refresh
  function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const shuffledProducts = shuffleArray(products);

  return (
    <div className="p-8">
      <Container>
        <div>
          <HomeBanner />
        </div>
      </Container>
      <Suspense fallback={<p>Loading...</p>}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
        {shuffledProducts.map((product: any) => {
          return <ProductCard key={product.id} data={product} />;
        })}
      </div>
      </Suspense>
    </div>
  );
}
