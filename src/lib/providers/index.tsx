"use client";

import {NextUIProvider} from "@nextui-org/react";
import {ClerkProvider} from "@clerk/nextjs";
import {dark} from "@clerk/themes";
import StoreProvider from "./StoreProvider";

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <StoreProvider>
      <NextUIProvider>
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          }}
        >
          {children}
        </ClerkProvider>
      </NextUIProvider>
    </StoreProvider>
  );
}
