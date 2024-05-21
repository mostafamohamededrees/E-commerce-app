import Container from "@/app/components/Container";
import ManageProductsClient from "./ManageProductsClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import { Suspense } from "react";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access Denied" />;
  }

  return (
    <div className="pt-8 ">
      <Container>
        <Suspense fallback={<p>Loading...</p>}>
          <ManageProductsClient products={products} />
        </Suspense>
      </Container>
    </div>
  );
};

export default ManageProducts;
