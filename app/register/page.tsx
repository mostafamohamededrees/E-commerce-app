import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import RegisterForm from "./RegisterForm";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const Register = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <FormWrap>
        <Suspense fallback={<p>Loading...</p>}>
          <RegisterForm currentUser={currentUser} />
        </Suspense>
      </FormWrap>
    </Container>
  );
};
export default Register;
