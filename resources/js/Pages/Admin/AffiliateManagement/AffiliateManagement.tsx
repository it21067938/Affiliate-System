import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { PageProps } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import AddAffiliateModal from "@/Components/Admin/AffiliateManagement/AddAffiliateModal";
import EditAffiliateModal from "@/Components/Admin/AffiliateManagement/EditAffiliateModal";

interface User {
    id: number;
    name: string;
    links_count: number;
    redirect_user_count: number;
    email: string;
}

interface AdminAffiliateProps extends PageProps {
    affiliates: User[];
}

const AffiliateManagement: React.FC<AdminAffiliateProps> = ({
    affiliates,
    auth,
}) => {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        id: 0,
        name: "",
        email: "",
        password: "",
        role: "affiliate",
    });

    const [isAddAffiliateModalOpen, setIsAddAffiliateModalOpen] =
        useState(false);
    const [isEditAffiliateModalOpen, setIsEditAffiliateModalOpen] =
        useState(false);
    const [isViewAffiliateModalOpen, setIsViewAffiliateModalOpen] =
        useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAffiliate, setSelectedAffiliate] = useState<User | null>(
        null
    );

    const openAffiliateDetails = (id: number) => {
        // Navigate to the affiliate details page
        Inertia.get(route('admin.affiliateshow', { id }));
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this affiliate?")) {
            Inertia.delete(route("admin.affiliatedestroy", { id }), {
                onSuccess: () => {
                    toast.success("Affiliate deleted successfully!", {
                        position: "top-right",
                        autoClose: 3900,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        theme: "light",
                    });
                },
                onError: () => {
                    toast.error("There was an error deleting the affiliate.", {
                        position: "top-right",
                        autoClose: 3900,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    });
                },
            });
        }
    };

    const openAddModal = () => {
        reset();
        setSelectedAffiliate(null);
        setIsAddAffiliateModalOpen(true);
    };

    const openEditModal = (affiliate: User) => {
        setSelectedAffiliate(affiliate);
        setData({
            id: affiliate.id,
            name: affiliate.name,
            email: affiliate.email,
            password: "",
            role: "affiliate",
        });
        setIsEditAffiliateModalOpen(true);
    };

    const openViewModal = (affiliate: User) => {
        setSelectedAffiliate(affiliate);
        setIsViewAffiliateModalOpen(true);
    };

    const closeModals = () => {
        setIsAddAffiliateModalOpen(false);
        setIsEditAffiliateModalOpen(false);
        setIsViewAffiliateModalOpen(false);
    };

    const filteredAffiliates = affiliates.filter(
        (affiliate) =>
            affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            affiliate.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("admin.addaffiliate"), {
            onSuccess: () => {
                toast.success("Affiliate added successfully!", {
                    position: "top-right",
                    autoClose: 3900,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    theme: "light",
                });
                reset();
                closeModals();
            },
            onError: () => {
                toast.error("There was an error adding the affiliate.", {
                    position: "top-right",
                    autoClose: 3900,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            },
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedAffiliate) {
            put(route("admin.updateaffiliate", { id: selectedAffiliate.id }), {
                onSuccess: () => {
                    toast.success("Affiliate updated successfully!", {
                        position: "top-right",
                        autoClose: 3900,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        theme: "light",
                    });
                    reset();
                    closeModals();
                },
                onError: () => {
                    toast.error("There was an error updating the affiliate.", {
                        position: "top-right",
                        autoClose: 3900,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        theme: "light",
                    });
                },
            });
        }
    };

    return (
        <AdminLayout user={auth.user}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                limit={4}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="overflow-x-auto flex min-h-screen bg-gray-100">
                <main className="flex-1 p-4 sm:p-6">
                    <Head title="Affiliate Management" />

                    <section className="mb-8">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
                            Affiliate Management
                        </h2>
                    </section>

                    <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <button
                            onClick={openAddModal}
                            className="mb-2 sm:mb-0 bg-black text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none"
                        >
                            + Add Affiliates
                        </button>
                        <input
                            type="text"
                            placeholder="Search Affiliates By Name and Email"
                            className="border border-gray-300 rounded-lg py-2 px-4 w-full sm:w-1/3 focus:outline-none focus:border-black"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="mt-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Links Generated
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Redirect User Count
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredAffiliates.map((affiliate) => (
                                        <tr key={affiliate.id}>
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                                                {affiliate.name}
                                            </td>
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                                                {affiliate.email}
                                            </td>
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                                                {affiliate.links_count}
                                            </td>
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                                                {affiliate.redirect_user_count}
                                            </td>
                                            <td className="px-2 sm:px-6 py-4 whitespace-nowrap flex space-x-2 sm:space-x-4 text-xs sm:text-sm">
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            affiliate.id
                                                        )
                                                    }
                                                    className="text-red-500 hover:text-red-700 focus:outline-none"
                                                    disabled={processing}
                                                >
                                                    <DeleteIcon />
                                                </button>
                                                <EditIcon
                                                    onClick={() =>
                                                        openEditModal(affiliate)
                                                    }
                                                    className="text-blue-500 hover:text-blue-700 focus:outline-none"
                                                />

                                                <PreviewIcon
                                                    onClick={() => openAffiliateDetails(affiliate.id)} 
                                                    className="text-green-500 hover:text-green-700 focus:outline-none"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Add Affiliate Modal */}
                    {isAddAffiliateModalOpen && (
                        <AddAffiliateModal
                            data={data}
                            setData={setData}
                            errors={errors}
                            handleAddSubmit={handleAddSubmit}
                            closeModals={closeModals}
                            processing={processing}
                        />
                    )}

                    {/* Edit Affiliate Modal */}
                    {isEditAffiliateModalOpen && (
                        <EditAffiliateModal
                            data={data}
                            setData={setData}
                            errors={errors}
                            handleEditSubmit={handleEditSubmit}
                            closeModals={closeModals}
                            processing={processing}
                        />
                    )}
                </main>
            </div>
        </AdminLayout>
    );
};

export default AffiliateManagement;
