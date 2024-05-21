import Container from "@/app/components/Container";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrders from "@/actions/getOrders";
import ManageOrdersClient from "./ManageOrdersClient";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const ManageOrders = async () => {
  const orders = await getOrders();
  const currentUser = await getCurrentUser();


  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access Denied" />;
  }

  return (
    <div className="pt-8 ">
      <Container>
        <Suspense fallback={<p>Loading...</p>}>
          <ManageOrdersClient orders={orders} />
        </Suspense>
      </Container>
    </div>
  );
};

export default ManageOrders;
