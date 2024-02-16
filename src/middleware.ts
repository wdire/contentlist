import {authMiddleware} from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/assets/(.*)", "/list/(.*)", "/api/tmdb/(.*)"],
  apiRoutes: ["/api/list/update/(.*)", "/api/list/create"],
  ignoredRoutes: ["/api/list/get/(.*)", "/api/list/getAll"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)/(.*)"],
};
