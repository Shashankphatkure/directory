import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: [
    "/wallet/:path*",
    "/profile",
    "/seller",
    "/notifications",
    "/transactions",
    // Add other protected routes here
  ],
};
