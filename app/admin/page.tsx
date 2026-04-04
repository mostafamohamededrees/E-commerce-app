import getProducts from "@/actions/getProducts";
import Summary from "./Summary";
import getOrders from "@/actions/getOrders";
import Container from "../components/Container";
import getUsers from "@/actions/getUsers";
import getGraphData from "@/actions/getGraphData";
import BarGraph from "./BarGraph";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";

const Admin = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Oops! Access Denied" />;
  }

  let users: any[] = [];
  let orders: any[] = [];
  let graphData: any[] = [];
  let products: any[] = [];

  try {
    users = await getUsers();
  } catch (error) {
    console.error("Error fetching users:", error);
    users = [];
  }

  try {
    orders = await getOrders();
  } catch (error) {
    console.error("Error fetching orders:", error);
    orders = [];
  }

  try {
    graphData = await getGraphData();
  } catch (error) {
    console.error("Error fetching graph data:", error);
    graphData = [];
  }

  try {
    products = await getProducts({ category: null });
  } catch (error) {
    console.error("Error fetching products:", error);
    products = [];
  }

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
