import AuthWrapper from "@/components/layout/AuthWrapper";
import {SignUp} from "@clerk/nextjs";

export default function Page() {
  return (
    <AuthWrapper>
      <SignUp />
    </AuthWrapper>
  );
}
