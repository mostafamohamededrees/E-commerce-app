import { Suspense } from "react";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckoutClient from "./CheckoutClient";
import { useSearchParams } from "next/navigation";

const Checkout = () => {
  const searchParams = useSearchParams()
  

  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <Suspense fallback={<p>Loading...</p>}>
            <CheckoutClient />
          </Suspense>
        </FormWrap>
      </Container>
    </div>
  );
};

export default Checkout;
