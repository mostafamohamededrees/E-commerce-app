import getProducts from "@/actions/getProducts";
import Summary from "./Summary";
import getOrders from "@/actions/getOrders";
import Container from "../components/Container";
import getUsers from "@/actions/getUsers";
import getGraphData from "@/actions/getGraphData";
import BarGraph from "./BarGraph";
import { getCurrentUser } from "@/actions/getCurrentUser";

const Admin = async () => {
  const users = await getUsers();
  const orders = await getOrders();
  const graphData = await getGraphData();
  const products = await getProducts({ category: null });



  return (
    <div className="pt-3">
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className="mt-4 mx-auto max-w-[1150px]">
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
};

export default Admin;
