import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import CartClient from "./CartClient";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const Cart = async () => {
  const currentUser = await getCurrentUser();
  const searchParams = useSearchParams()


  return (
    <div className="pt-8">
      <Container>
        <Suspense fallback={<p>Loading...</p>}>
          <CartClient currentUser={currentUser} />
        </Suspense>
      </Container>
    </div>
  );
};

export default Cart;
