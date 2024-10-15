import React from "react";

interface AddAffiliateModalProps {
    data: {
        name: string;
        email: string;
        password: string;
        role: string;
    };
    setData: (key: string, value: string) => void;
    errors: Record<string, string>;
    handleAddSubmit: (e: React.FormEvent) => void;
    closeModals: () => void;
    processing: boolean;
}

const AddAffiliateModal: React.FC<AddAffiliateModalProps> = ({
    data,
    setData,
    errors,
    handleAddSubmit,
    closeModals,
    processing,
}) => {
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                    &#8203;
                </span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                    <form onSubmit={handleAddSubmit}>
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                                        Add New Affiliate
                                    </h3>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            value={data.name}
                                            onChange={(e) => setData("name", e.target.value)}
                                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-black"
                                        />
                                        {errors.name && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            value={data.email}
                                            onChange={(e) => setData("email", e.target.value)}
                                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-black"
                                        />
                                        {errors.email && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.email}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={data.password}
                                            onChange={(e) => setData("password", e.target.value)}
                                            className="border border-gray-300 rounded-lg py-2 px-4 w-full focus:outline-none focus:border-black"
                                        />
                                        {errors.password && (
                                            <div className="text-red-500 text-xs mt-1">
                                                {errors.password}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-800 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                {processing ? "Adding..." : "Add Affiliate"}
                            </button>
                            <button
                                type="button"
                                onClick={closeModals}
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAffiliateModal;
