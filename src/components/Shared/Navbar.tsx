"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { logOut } from "../services/Auth";
import { useUser } from "@/context/UserContext";
import { protectedRoutes } from "@/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user, setIsLoading } = useUser();
  const handleLogout = () => {
    logOut();
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  const navItems = [
    { name: "Home", href: "/", icon: "🏠" },
    { name: "Services", href: "/services", icon: "🩺" },
    { name: "Doctors", href: "/doctors", icon: "👨‍⚕️" },
    { name: "Appointments", href: "/appointments", icon: "📅" },
    { name: "Health Records", href: "/records", icon: "📋" },
    { name: "Emergency", href: "/emergency", icon: "🚑" },
  ];

  const handleSearch = (e: any) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  // ইউজারের role কে lowercase এ কনভার্ট করা
  const userRole = user?.role?.toLowerCase() as
    | "admin"
    | "doctor"
    | "patient"
    | undefined;
  // Generalized dashboard redirect
  const handleClick = () => {
    if (userRole) {
      router.push(`/${userRole}/dashboard`);
    } else {
      router.push("/login"); // fallback যদি role না থাকে
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white shadow-md h-16 transition-all duration-400 ${
        isScrolled ? "bg-white shadow-lg py-0" : "bg-blue-50 py-1"
      }`}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full">
              <span className="text-white text-xl font-bold">H</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-blue-800">
                HealthCare Pro
              </h1>
              <p className="text-xs text-blue-600">
                Advanced Medical Solutions
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Section - Search, Book, User */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search doctors, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute left-3 text-gray-400 hover:text-blue-600"
                >
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>

            {/* Book Appointment Button */}
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
              Book Appointment
            </button>
            {/* Register and login */}

            {user ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>User</AvatarFallback>
                      </Avatar>
                    </div>
                  </button>

                  {/* User Dropdown */}
                  {userMenuOpen && (
                    <div className="absolute  right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-800">John Doe</p>
                        <p className="text-sm text-gray-600">
                          john.doe@example.com
                        </p>
                      </div>
                      <div className="py-2">
                        <Link
                          href="/profile"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                        >
                          <i className="fas fa-user mr-3 text-blue-500"></i>
                          My Profile
                        </Link>
                        <Link
                          href="/appointments"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                        >
                          <i className="fas fa-calendar mr-3 text-green-500"></i>
                          My Appointments
                        </Link>
                        <Link
                          href="/records"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                        >
                          <i className="fas fa-file-medical mr-3 text-purple-500"></i>
                          Health Records
                        </Link>
                        <button
                          onClick={handleClick}
                          className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-blue-50"
                        >
                          <i className="fas fa-cog mr-3 text-gray-500"></i>
                          Dashboard
                        </button>
                        <Link
                          href="/settings"
                          className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50"
                        >
                          <i className="fas fa-cog mr-3 text-gray-500"></i>
                          Settings
                        </Link>
                      </div>
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                        >
                          <i className="fas fa-sign-out-alt mr-3"></i>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href={"/register"}>
                  <Button variant="outline" className="rounded-full">
                    Register
                  </Button>
                </Link>
                <Link href={"/login"}>
                  <Button variant="outline" className="rounded-full">
                    Log in
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            <button className="p-2 rounded-lg hover:bg-blue-600 transition-colors">
              <i className="fas fa-search text-blue-600"></i>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <i
                className={`fas ${
                  isOpen ? "fa-times" : "fa-bars"
                } text-blue-600 text-xl`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-900 pt-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Mobile User Section */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 px-4 py-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">JD</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">John Doe</p>
                  <p className="text-sm text-gray-600">Patient</p>
                </div>
              </div>

              <button className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors">
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
