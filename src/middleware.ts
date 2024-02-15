import {authMiddleware} from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/assets/(.*)", "/list/(.*)"],
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
