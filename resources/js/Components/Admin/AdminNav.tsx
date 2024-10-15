import React, { useState, useEffect, ReactNode } from "react";
import { Link } from "@inertiajs/react";
import { Home, Users, BarChart2, LogOut } from "lucide-react";

interface NavButtonProps {
    icon: ReactNode;
    label: string;
    href: string;
}

const SideNav: React.FC = () => {
    const [activeButton, setActiveButton] = useState<string>(() => {
        return localStorage.getItem("activeButton") || "Home";
    });

    const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    useEffect(() => {
        localStorage.setItem("activeButton", activeButton);
    }, [activeButton]);

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
        <div className="flex h-screen">
            {/* Sidebar for desktop */}
            <div className={`hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                <div className="flex items-center mb-4">
                    <Users size={23} />
                    <h1 className="ml-2 text-black font-semibold text-xl">Admin</h1>
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
                        href=""
                    />
                </nav>
            </div>
            
            {/* Mobile menu button */}
            <button
                className="md:hidden p-4 text-gray-500"
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

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-white shadow-lg p-4 z-50">
                    <div className="flex items-center mb-4">
                        <Users size={23} />
                        <h1 className="ml-2 text-black font-semibold text-xl">Admin</h1>
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
                            href=""
                        />
                    </nav>
                </div>
            )}
        </div>
    );
};

export default SideNav;
