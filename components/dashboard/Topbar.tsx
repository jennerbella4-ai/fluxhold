"use client";

import { useState, Fragment, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import {
  BellIcon,
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  ViewColumnsIcon,
  ChevronDownIcon,
  ArrowPathIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

const userNavigation = [
  { name: "Your Profile", href: "/dashboard/profile" },
  { name: "Account Settings", href: "/dashboard/settings" },
  { name: "Billing", href: "/dashboard/billing" },
  { name: "Help Center", href: "/help" },
];

export default function Topbar({ title, onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const [notifications] = useState([
    {
      id: 1,
      title: "New investment opportunity",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Portfolio update available",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 3,
      title: "Weekly report generated",
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "Market alert: Tech stocks rising",
      time: "4 hours ago",
      read: false,
    },
  ]);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  // Detect scroll and screen size
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close search on mobile when clicking outside
  useEffect(() => {
    if (searchOpen && isMobile) {
      const handleClickOutside = () => setSearchOpen(false);
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [searchOpen, isMobile]);

  const refreshPage = () => {
    window.location.reload();
  };

  const viewOptions = [
    { name: "Compact View", icon: ViewColumnsIcon },
    { name: "Detailed View", icon: AdjustmentsHorizontalIcon },
    { name: "Refresh Data", icon: ArrowPathIcon, action: refreshPage },
  ];

  const [userProfile, setUserProfile] = useState({
    name: "",
    role: "",
    avatar: "",
  });

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
  
      console.log("AUTH USER:", user);
  
      if (!user || authError) {
        console.error("Auth error:", authError);
        return;
      }
  
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, role, avatar")
        .eq("id", user.id)
        .single();
  
      console.log("PROFILE DATA:", data);
      console.log("PROFILE ERROR:", error);
  
      if (error) return;
  
      if (data) {
        setUserProfile({
          name: data.full_name,
          role: data.role || "Standard Account",
          avatar: data.avatar || "",
        });
      }
      const {
        data: { session },
      } = await supabase.auth.getSession();
      
      console.log("SESSION:", session);
      
    };
  
    getProfile();
  }, []);
  
  

  return (
    <div
      className={`sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b ${
        isScrolled
          ? "border-gray-800 bg-[#0B1C2D]/95 backdrop-blur-lg"
          : "border-gray-800 bg-[#0B1C2D]/80 backdrop-blur-sm"
      } px-4 transition-all duration-200 sm:gap-x-6 sm:px-6 lg:ps-12`}
    >
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-400 hover:text-white lg:hidden"
        onClick={onMenuClick}
        aria-label="Open sidebar"
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Separator for mobile */}
      <div className="h-6 w-px bg-gray-800 lg:hidden" />

      {/* Title Area - Responsive */}
      <div className="flex flex-1 items-center min-w-0">
        {/* Title - Hidden when search is open on mobile */}
        {(!searchOpen || !isMobile) && (
          <div className="flex items-center min-w-0 mr-4">
            <h1 className="text-lg sm:text-xl font-bold ps-0 md:ps-10 text-white truncate ">
              {title}
            </h1>
          </div>
        )}

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex ml-auto mr-4 flex-1 max-w-md">
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full rounded-xl border-0 bg-gray-800/50 py-2 pl-10 pr-10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0EF2C2] sm:text-sm transition-all"
              placeholder="Search investments, reports..."
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <XMarkIcon className="h-4 w-4 text-gray-400 hover:text-white" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search Button */}
        <button
          onClick={() => setSearchOpen(true)}
          className="lg:hidden ml-auto p-2 text-gray-400 hover:text-white"
          aria-label="Open search"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile Search Overlay */}
      {searchOpen && isMobile && (
        <div className="fixed inset-0 z-50 bg-black/95 lg:hidden">
          <div className="flex items-center h-16 px-4">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-xl border-0 bg-gray-800 py-3 pl-10 pr-12 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#0EF2C2] text-base"
                placeholder="Search investments, reports..."
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Right Section */}
      <div className="flex items-center gap-x-3 lg:gap-x-4">
        {/* Help/Support Button */}
        <button
          className="hidden sm:flex p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors"
          title="Help & Support"
        >
          <QuestionMarkCircleIcon className="h-5 w-5" />
        </button>

        {/* View Options Dropdown */}
        <Menu as="div" className="relative hidden sm:block">
          <Menu.Button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800/50 transition-colors">
            <AdjustmentsHorizontalIcon className="h-5 w-5" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-xl bg-[#0B1C2D] border border-gray-800 py-1 shadow-lg">
              {viewOptions.map((option) => (
                <Menu.Item key={option.name}>
                  {({ active }) => (
                    <button
                      onClick={option.action}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        active ? "bg-gray-800/50" : ""
                      } text-white`}
                    >
                      <option.icon className="h-4 w-4 mr-3" />
                      {option.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>

        {/* Notifications - Responsive */}
        <Menu as="div" className="relative">
          <Menu.Button className="p-2 text-gray-400 hover:text-white relative">
            <BellIcon className="h-5 w-5" />
            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadNotifications > 9 ? "9+" : unreadNotifications}
              </span>
            )}
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-80 sm:w-96 origin-top-right rounded-xl bg-[#0B1C2D] border border-gray-800 py-2 shadow-lg">
              <div className="px-4 py-3 border-b border-gray-800">
                <h3 className="text-sm font-semibold text-white">
                  Notifications
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {unreadNotifications} unread
                </p>
              </div>
              <div className="max-h-[60vh] overflow-y-auto">
                {notifications.map((notification) => (
                  <Menu.Item key={notification.id}>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`flex items-start px-4 py-3 border-b border-gray-800/50 last:border-0 ${
                          active ? "bg-gray-800/30" : ""
                        } ${!notification.read ? "bg-[#0EF2C2]/5" : ""}`}
                      >
                        <div className="flex-shrink-0">
                          <div
                            className={`h-2 w-2 rounded-full mt-2 ${
                              notification.read ? "bg-gray-600" : "bg-[#0EF2C2]"
                            }`}
                          />
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-gray-800">
                <a
                  href="/dashboard/notifications"
                  className="text-sm text-[#0EF2C2] hover:text-white block text-center py-2"
                >
                  View all notifications
                </a>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        {/* Separator */}
        <div className="hidden lg:block h-6 w-px bg-gray-800" />

        {/* User Menu - Responsive */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center space-x-2 p-1 hover:bg-gray-800/50 rounded-lg transition-colors">
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm font-medium text-white truncate max-w-[120px]">
                {userProfile.name || "User"}
              </p>
              <p className="text-xs text-gray-400 truncate max-w-[120px]">
                {userProfile?.role || "Standard Account"}
              </p>
            </div>
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-[#0EF2C2] flex items-center justify-center bg-gray-700 text-white font-bold">
                {userProfile?.avatar ? (
                  <Image
                    src={userProfile.avatar}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  userProfile?.name?.charAt(0).toUpperCase() || "U"
                )}
              </div>

              <div className="absolute -bottom-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-[#0B1C2D]"></div>
            </div>
            <ChevronDownIcon className="hidden sm:block h-4 w-4 text-gray-400" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-48 sm:w-56 origin-top-right rounded-xl bg-[#0B1C2D] border border-gray-800 py-1 shadow-lg">
              <div className="px-4 py-3 border-b border-gray-800 sm:hidden">
                <p className="text-sm font-medium text-white">Kyle Manzardo</p>
                <p className="text-xs text-gray-400">Premium Investor</p>
              </div>
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      href={item.href}
                      className={`block px-4 py-2 text-sm ${
                        active ? "bg-gray-800/50" : ""
                      } text-white`}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
              <div className="border-t border-gray-800 my-1" />
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="/logout"
                    className={`block px-4 py-2 text-sm ${
                      active ? "bg-gray-800/50" : ""
                    } text-red-400`}
                  >
                    Sign out
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
