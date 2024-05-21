import Container from "@/app/components/Container";
import OrderDetails from "./OrderDetails";
import { getOrderById } from "@/actions/getOrderById";
import NullData from "@/app/components/NullData";
import { useSearchParams } from "next/navigation";

interface IPrams {
  orderId?: string;
}

const Order = async ({ params }: { params: IPrams }) => {
  const order = await getOrderById(params);
  const searchParams = useSearchParams()


  if (!order) {
    return <NullData title="No Order Found"></NullData>;
  }

  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};
export default Order;
