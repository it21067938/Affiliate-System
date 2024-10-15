import AdminLayout from "@/Layouts/AdminLayout";
import { Inertia } from "@inertiajs/inertia";
import React, { useState } from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/solid";

interface Redirect {
   ip_address: string;
   browser: string;
   os: string;
   device: string;
   created_at: string;
}

interface Link {
   name: string;
   target: string;
   created_at: string;
   slug: string;
   redirects: Redirect[];
}

interface Affiliate {
   name: string;
   email: string;
   links: Link[];
}

interface PageProps {
   auth: any;
   currentUrl: string; // Assuming currentUrl is passed in the props
   affiliate: Affiliate; // Add affiliate to props
}

export default function AffiliateDetails({
   auth,
   affiliate,
   currentUrl,
}: PageProps) {
   const [isModalOpen, setModalOpen] = useState(false);
   const [selectedLink, setSelectedLink] = useState<Link | null>(null); // Store selected link data for the popup

   const goBack = () => {
      Inertia.get(route("admin.affiliatemanagement"));
   };

   // Function to open the modal and set the selected link
   const openModal = (link: Link) => {
      setSelectedLink(link);
      setModalOpen(true);
   };

   // Function to close the modal
   const closeModal = () => {
      setModalOpen(false);
      setSelectedLink(null);
   };

   return (
      <AdminLayout user={auth.user}>
         <div className="lex bg-gray-100">
            <div className="p-6">
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                     <ArrowLeftCircleIcon
                        className="w-8 h-8 text-blue-600 hover:text-blue-800 cursor-pointer transition duration-200"
                        onClick={goBack}
                     />
                     <h1 className="text-3xl font-bold text-gray-800">
                        Affiliate Details
                     </h1>
                  </div>
               </div>

               {/* Affiliate Info */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-4 shadow-lg rounded-lg">
                     <p className="text-gray-500 font-medium">Name:</p>
                     <p className="text-gray-900 text-lg">{affiliate.name}</p>
                  </div>
                  <div className="bg-white p-4 shadow-lg rounded-lg">
                     <p className="text-gray-500 font-medium">Email:</p>
                     <p className="text-gray-900 text-lg">{affiliate.email}</p>
                  </div>
                  <div className="bg-white p-4 shadow-lg rounded-lg">
                     <p className="text-gray-500 font-medium">
                        Total Links Created:
                     </p>
                     <p className="text-gray-900 text-lg">
                        {affiliate.links.length}
                     </p>
                  </div>
               </div>

               {/* Links Created */}
               <div>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                     Links Created
                  </h2>
                  {affiliate.links.length > 0 ? (
                     <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                           <thead>
                              <tr className="bg-gray-200">
                                 <th className="py-3 px-4 border-b text-left text-gray-600">
                                    Name
                                 </th>
                                 <th className="py-3 px-4 border-b text-left text-gray-600">
                                    Target URL
                                 </th>
                                 <th className="py-3 px-4 border-b text-left text-gray-600">
                                    Generated Link
                                 </th>
                                 <th className="py-3 px-4 border-b text-left text-gray-600">
                                    Created On
                                 </th>
                                 <th className="py-3 px-4 border-b text-left text-gray-600">
                                    Actions
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              {affiliate.links.map((link, index) => (
                                 <tr
                                    key={index}
                                    className="hover:bg-gray-50 transition duration-200"
                                 >
                                    <td className="py-3 px-4 border-b text-gray-900">
                                       {link.name}
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                       <a
                                          href={link.target}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-600 hover:underline"
                                       >
                                          {link.target.length > 30
                                             ? `${link.target.substring(
                                                  0,
                                                  30
                                               )}...`
                                             : link.target}
                                       </a>
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                       <a
                                          href={`${currentUrl}/${link.slug}`}
                                          className="text-blue-600 hover:underline"
                                       >
                                          {`${currentUrl}/${link.slug}`.length >
                                          30
                                             ? `${currentUrl}/${link.slug}`.substring(
                                                  0,
                                                  30
                                               ) + "..."
                                             : `${currentUrl}/${link.slug}`}
                                       </a>
                                    </td>
                                    <td className="py-3 px-4 border-b text-gray-600">
                                       {new Date(
                                          link.created_at
                                       ).toLocaleString()}
                                    </td>
                                    <td className="py-3 px-4 border-b">
                                       <button
                                          onClick={() => openModal(link)}
                                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200"
                                       >
                                          View
                                       </button>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  ) : (
                     <p>No links created yet.</p>
                  )}
               </div>
            </div>
         </div>

         {/* Popup for viewing redirects */}
         {isModalOpen && selectedLink && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
               <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
                  <div className="flex justify-between items-center mb-4">
                     <h2 className="text-1xl font-semibold">Redirect User Details for {selectedLink.name}</h2>
                     <button
                        onClick={closeModal}
                        className="text-red-500 text-xl font-bold"
                     >
                        &times;
                     </button>
                  </div>

                  {selectedLink.redirects.length > 0 ? (
                     <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                        <thead>
                           <tr className="bg-gray-100">
                              <th className="py-2 px-4 border">IP Address</th>
                              <th className="py-2 px-4 border">Browser</th>
                              <th className="py-2 px-4 border">OS</th>
                              <th className="py-2 px-4 border">Device</th>
                              <th className="py-2 px-4 border">Land On</th>
                           </tr>
                        </thead>
                        <tbody>
                           {selectedLink.redirects.map((redirect, idx) => (
                              <tr key={idx}>
                                 <td className="py-2 px-4 border">{redirect.ip_address}</td>
                                 <td className="py-2 px-4 border">{redirect.browser}</td>
                                 <td className="py-2 px-4 border">{redirect.os}</td>
                                 <td className="py-2 px-4 border">{redirect.device}</td>
                                 <td className="py-2 px-4 border">{new Date(redirect.created_at).toLocaleString()}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  ) : (
                     <p>No redirects yet.</p>
                  )}
               </div>
            </div>
         )}
      </AdminLayout>
   );
}
