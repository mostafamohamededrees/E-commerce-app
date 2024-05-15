import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "@/app/components/Products/ListRating";
// import { products } from "@/utils/Products";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface Iparams {
  productId?: string;
}

const Product = async ({ params }: { params: Iparams }) => {
  const product = await getProductById(params);

  const user = await getCurrentUser();


  if (!product) return <NullData title="Product with this ID does not exist" />;

  // product chosen(pass it) to display in the Product Details page
  // const product = products.find((item) => item.id === params.productId);

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col mt-20 gap-4 ">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};
export default Product;
