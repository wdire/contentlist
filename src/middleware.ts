import {CreateResponse} from "@/api/lib/response.api";
import {authMiddleware} from "@clerk/nextjs/server";
import {NextResponse} from "next/server";

export default authMiddleware({
  publicRoutes: ["/(.*)"],
  apiRoutes: ["/api/list/update/(.*)", "/api/list/delete/(.*)", "/api/list/create"],
  ignoredRoutes: ["/assets/(.*)"],
  afterAuth(auth, req) {
    if (!auth.userId && auth.isApiRoute) {
      if (req.method === "GET") {
        return NextResponse.rewrite(new URL("/404", req.url));
      }

      return CreateResponse({
        status: 401,
      });
    }

    // idk when this will run, poor if block
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect("/");
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|favicon.ico|robots.txt|_next).*)", "/", "/(api)/(.*)"],
};
