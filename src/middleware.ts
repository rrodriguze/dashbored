import { authMiddleware } from "better-auth/next-js";
import { NextResponse } from "next/server";

const authRoutes = ["/login", "/login/email", "/signup"]
const publicRoutes = ["/", "/contact"].concat(authRoutes)

export default authMiddleware({
	customRedirect: async (session, request) => {
		const baseURL = request.nextUrl.origin;

        if (session && authRoutes.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/home", baseURL))
        }

        if (!session && !publicRoutes.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL("/login", baseURL))
        }

		return NextResponse.next();
	},
});
 
export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
