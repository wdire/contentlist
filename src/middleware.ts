import {authMiddleware} from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/list/(.*)", "/api/list/delete/(.*)", "/api/webhooks/clerk"],
  apiRoutes: ["/api/list/update/(.*)", "/api/list/create"],
  ignoredRoutes: ["/assets/(.*)", "/api/list/get/(.*)", "/api/list/getAll", "/api/tmdb/(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|robots.txt|_next).*)", "/", "/(api)/(.*)"],
};
