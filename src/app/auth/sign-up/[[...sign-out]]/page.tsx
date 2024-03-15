import AuthWrapper from "@/components/layout/AuthWrapper";
import {SignUp} from "@clerk/nextjs";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <AuthWrapper>
      <SignUp
        appearance={{
          elements: {
            logoBox: {
              display: "none",
            },
          },
        }}
      />
    </AuthWrapper>
  );
}
