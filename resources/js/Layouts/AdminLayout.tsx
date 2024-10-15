import { User } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import React, {
   PropsWithChildren,
   ReactNode,
   useEffect,
   useState,
} from "react";
import { Home, Users, BarChart2, LogOut } from "lucide-react";
import Footer from "@/Components/Footer/Footer";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Dropdown from "@/Components/Dropdown";

interface NavButtonProps {
   icon: ReactNode;
   label: string;
   href: string;
}

export default function AdminLayout({
   user,
   header,
   children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
   const { url } = usePage(); // Get the current URL

   const [activeButton, setActiveButton] = useState<string>(() => {
      return localStorage.getItem("activeButton") || "Home";
   });

   const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

   useEffect(() => {
      localStorage.setItem("activeButton", activeButton);
   }, [activeButton]);

   const [showingNavigationDropdown, setShowingNavigationDropdown] =
      useState(false);

   const NavButton: React.FC<NavButtonProps> = ({ icon, label, href }) => {
      const isActive = url === href; // Check if the current URL matches the button's href

      return (
         <Link
            href={href}
            className={`w-full py-2 px-4 rounded-md flex items-center justify-start space-x-2 ${
               isActive
                  ? "bg-blue-800 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => {
               setActiveButton(label);
               setMobileMenuOpen(false); // Close menu on link click
            }}
         >
            {icon}
            <span>{label}</span>
         </Link>
      );
   };

   return (
      <>
         <nav className="bg-blue-800 border-b border-gray-100">
            <div className="px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between h-16 items-center">
                  {/* Logo and Mobile Menu Button */}
                  <div className="flex items-center">
                     <button
                        className="md:hidden mr-2 p-2 text-white"
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                     >
                        <svg
                           className="w-6 h-6"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 12h16m-7 6h7"
                           />
                        </svg>
                     </button>
                     <div className="text-white font-semibold text-xl">
                        Axcertro Affiliate Hub
                     </div>
                  </div>

                  <div className="flex items-center space-x-4">
                     {/* Notifications Icon */}
                     <button className="p-2 rounded-full bg-gray-200">
                        <span role="img" aria-label="Notifications">
                           🔔
                        </span>
                     </button>

                     {/* User Avatar Icon */}
                     <Dropdown>
                        <Dropdown.Trigger>
                           <span className="inline-flex rounded-md">
                              <button className="p-2 rounded-full bg-gray-200">
                                 <span role="img" aria-label="User">
                                    👤
                                 </span>
                              </button>
                           </span>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                           <Dropdown.Link href={route("admin.dashboard")}>
                              Dashboard
                           </Dropdown.Link>
                           <Dropdown.Link href={route("profile.edit")}>
                              Profile
                           </Dropdown.Link>
                           <Dropdown.Link
                              href={route("logout")}
                              method="post"
                              as="button"
                           >
                              Log Out
                           </Dropdown.Link>
                        </Dropdown.Content>
                     </Dropdown>
                  </div>
               </div>
            </div>

            {/* Mobile menu button */}
            <div
               className={
                  (showingNavigationDropdown ? "block" : "hidden") +
                  " sm:hidden"
               }
            >
               <div className="pt-2 pb-3 space-y-1">
                  <ResponsiveNavLink
                     href={route("admin.dashboard")}
                     active={route().current("admin.dashboard")}
                  >
                     Dashboard
                  </ResponsiveNavLink>
               </div>

               <div className="pt-2 pb-3 space-y-1">
                  <ResponsiveNavLink href={route("profile.edit")}>
                     Profile
                  </ResponsiveNavLink>
               </div>

               <div className="pt-2 pb-3 space-y-1">
                  <ResponsiveNavLink
                     method="post"
                     href={route("logout")}
                     as="button"
                  >
                     Log Out
                  </ResponsiveNavLink>
               </div>
            </div>
         </nav>

         <div className="flex h-screen">
            {/* Sidebar for desktop */}
            <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
               <div className="flex items-center mb-4">
                  <Users size={23} />
                  <h1 className="ml-2 text-black font-semibold text-xl">
                     Admin
                  </h1>
               </div>
               <nav className="space-y-2">
                  <NavButton
                     icon={<Home size={20} />}
                     label="Home"
                     href="/admin/dashboard"
                  />
                  <NavButton
                     icon={<Users size={20} />}
                     label="Affiliate Management"
                     href="/admin/affiliatemanagement"
                  />
                  <NavButton
                     icon={<BarChart2 size={20} />}
                     label="Report Analytics"
                     href="/admin/reportanalytics"
                  />
                  <NavButton
                     icon={<LogOut size={20} />}
                     label="Logout"
                     href={route("logout")}
                  />
               </nav>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
               <div className="fixed inset-0 bg-white shadow-lg p-4 z-50">
                  <div className="flex items-center mb-4">
                     <Users size={23} />
                     <h1 className="ml-2 text-black font-semibold text-xl">
                        Admin
                     </h1>
                  </div>
                  <nav className="space-y-2">
                     <NavButton
                        icon={<Home size={20} />}
                        label="Home"
                        href="/admin/dashboard"
                     />
                     <NavButton
                        icon={<Users size={20} />}
                        label="Affiliate Management"
                        href="/admin/affiliatemanagement"
                     />
                     <NavButton
                        icon={<BarChart2 size={20} />}
                        label="Report Analytics"
                        href="/admin/reportanalytics"
                     />
                     <NavButton
                        icon={<LogOut size={20} />}
                        label="Logout"
                        href={route("logout")}
                     />
                  </nav>
               </div>
            )}

            <div className="flex-1 p-1 overflow-x-auto">
               {header && (
                  <header className="mb-4">
                     <h2 className="text-xl overflow-x-auto font-semibold text-gray-700">
                        {header}
                     </h2>
                  </header>
               )}

               <main className="overflow-x-auto">{children}</main>

               <footer className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                     <div className="text-gray-900">
                        <Footer />
                     </div>
                  </div>
               </footer>
            </div>
         </div>
      </>
   );
}
