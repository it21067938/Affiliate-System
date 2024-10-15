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

export default function AffiliateLayout({
    header,
    children,
}: PropsWithChildren<{header?: ReactNode }>) {

    const {user} = usePage().props.auth as { user: User };

    const [activeButton, setActiveButton] = useState<string>(() => {
        return localStorage.getItem("activeButton") || "Home";
    });

    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        localStorage.setItem("activeButton", activeButton);
    }, [activeButton]);

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const NavButton: React.FC<NavButtonProps> = ({ icon, label, href }) => (
        <Link
            href={href}
            className={`w-full py-2 px-4 rounded-md flex items-center justify-start space-x-2 ${
                activeButton === label
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

    return (
        <>
            <nav className="bg-blue-900 border-b border-gray-100">
                <div className="px-4 sm:px-6 lg:px-0 container mx-auto">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo and Mobile Menu Button */}
                        <div className="flex items-center">
                            <button
                                className="md:hidden mr-2 p-2 text-white"
                                onClick={() =>
                                    setMobileMenuOpen(!isMobileMenuOpen)
                                }
                            ></button>
                            <div className="text-white font-semibold text-xl">
                                Axcertro Affiliate Hub
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* User Avatar Icon */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button className="p-2 rounded-full bg-gray-200 w-10">
                                            <span role="img" aria-label="User">
                                                👤
                                            </span>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link
                                        href={route("affiliate.dashboard")}
                                    >
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
            </nav>

            <div className="flex-1 p-1">
                {header && (
                    <header className="mb-4">
                        <h2 className="text-xl font-semibold text-gray-700">
                            {header}
                        </h2>
                    </header>
                )}
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
}
