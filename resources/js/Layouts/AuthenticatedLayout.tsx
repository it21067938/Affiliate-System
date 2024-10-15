import { useState, PropsWithChildren, ReactNode } from "react";
import Dropdown from "@/Components/Dropdown";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import Footer from "@/Components/Footer/Footer";
import { User } from "@/types";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const pageProps = usePage().props;

    const getDashboardRoute = () => {
        switch (user.role) {
            case "admin":
                return route("admin.dashboard");
            case "affiliate":
                return route("affiliate.dashboard");
            default:
                return route("dashboard");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            {/* <nav className="bg-blue-800 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                      
                        <div className="flex items-center text-white text-xl font-semibold">
                            Axcertro Affiliate Hub
                        </div>

                       
                        <div className="flex items-center">
                           
                            <div className="flex sm:hidden">
                                <button
                                    onClick={() => setShowingNavigationDropdown(prev => !prev)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path
                                            className={!showingNavigationDropdown ? "inline-flex" : "hidden"}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={showingNavigationDropdown ? "inline-flex" : "hidden"}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            
                            <div className="hidden sm:flex sm:items-center sm:ml-6">
                                <div className="flex items-center space-x-4">
                                    <button className="p-2 rounded-full bg-gray-200">
                                        <span role="img" aria-label="Notifications">🔔</span>
                                    </button>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button className="p-2 rounded-full bg-gray-200">
                                                    <span role="img" aria-label="User">👤</span>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href={getDashboardRoute()}>
                                                Dashboard
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route("profile.edit")}>
                                                Profile
                                            </Dropdown.Link>
                                            <Dropdown.Link href={route("logout")} method="post" as="button">
                                                Log Out
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className={(showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={getDashboardRoute()} active={route().current("dashboard")}>
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <ResponsiveNavLink href={route("profile.edit")}>
                            Profile
                        </ResponsiveNavLink>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink method="post" href={route("logout")} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav> */}

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
