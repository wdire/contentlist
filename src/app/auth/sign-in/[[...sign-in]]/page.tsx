import AuthWrapper from "@/components/layout/AuthWrapper";
import {SignIn} from "@clerk/nextjs";

export default function Page() {
  return (
    <AuthWrapper>
      <SignIn />
    </AuthWrapper>
  );
}
