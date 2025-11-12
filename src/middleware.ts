import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./components/services/Auth";

// যেসব রুট সবার জন্য উন্মুক্ত
const publicRoutes = ["/login", "/register"];
type Role = keyof typeof roleBasedPrivateRoutes;
const roleBasedPrivateRoutes = {
  admin: [/^\/admin/],
  doctors: [/^\/doctor/],
  patient: [/^\/patient/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role) {
    const role = userInfo.role.toLowerCase() as Role;
    const routes = roleBasedPrivateRoutes[role];
    if (routes?.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
};

// matcher-এ সব প্রাইভেট রুট যুক্ত করুন
export const config = {
  matcher: [
    "/doctors",
    "/doctor/:page",
    "/admin",
    "/admin/:page",
    "/patient",
    "/patient/:page",
    "/login",
  ],
};
