import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./components/services/Auth";

// যেসব রুট সবার জন্য উন্মুক্ত
const publicRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedPrivateRoutes;

const roleBasedPrivateRoutes = {
  admin: [/^\/admin/],
  doctor: [/^\/doctor/],
  patient: [/^\/patient/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  // যদি ইউজার লগইন না করে থাকে
  if (!userInfo) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }

  // ইউজারের role অনুযায়ী রুট চেক করা
  if (userInfo?.role) {
    const role = userInfo.role.toLowerCase() as Role;
    const routes = roleBasedPrivateRoutes[role];

    // যদি ইউজারের role অনুযায়ী রুট মিলে যায় → allow
    if (routes?.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }

    // ভুল role হলে redirect করে dashboard এ পাঠানো হবে
    return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
  }

  // fallback
  return NextResponse.redirect(new URL("/login", request.url));
};

// matcher-এ সব প্রাইভেট রুট যুক্ত করুন
export const config = {
  matcher: ["/doctor/:path*", "/admin/:path*", "/patient/:path*"],
};
