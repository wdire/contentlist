import AuthWrapper from "@/components/layout/AuthWrapper";
import {SignIn} from "@clerk/nextjs";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function Page() {
  return (
    <AuthWrapper>
      <SignIn
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
