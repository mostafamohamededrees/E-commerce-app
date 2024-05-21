import Container from "@/app/components/Container";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import OrderClient from "./OrderClient";
import getOrdersByUserId from "@/actions/getOrdersByUserId";
import { Suspense } from "react";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <NullData title="Oops! Access Denied" />;
  }

  const orders = await getOrdersByUserId(currentUser.id);

  if (!orders) {
    return <NullData title="No Orders Found" />;
  }

  return (
    <div className="pt-8 ">
      <Container>
        <Suspense fallback={<p>Loading...</p>}>
          <OrderClient orders={orders} />
        </Suspense>
      </Container>
    </div>
  );
};

export default Orders;
