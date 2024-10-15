import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import { MdOutlineDelete, MdOutlinePreview } from "react-icons/md";
import { AffiliateLinkDetails } from "../../../../Components/Affiliate/AffiliateLinkDetails";
import { Link } from "@inertiajs/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Slide, toast } from "react-toastify";
import { CopyIcon } from "lucide-react";

export const RecentLinks = ({ links, currentUrl, handleRemove }: any) => {
   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const [selectedLink, setSelectedLink] = useState<any>(null);

   const openPopup = (link: any) => {
      setSelectedLink(link);
      setIsPopupOpen(true);
   };

   const closePopup = () => {
      setIsPopupOpen(false);
      setSelectedLink(null); // Reset selected link when closing
   };


   const copiedHandler = () => {
            toast.success("Link Copied successfully!", {
               position: "top-right",
               autoClose: 2000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               theme: "colored",
               transition: Slide,
            });
   }


   return (
      <div className="px-4 sm:px-6 lg:px-0">
         <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
               <h2 className="text-2xl sm:text-3xl font-bold">
                  Generated Links
               </h2>
            </div>
         </div>
         <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
               <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden bg-white shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                     <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                           <tr>
                              <th
                                 scope="col"
                                 className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                 Link
                              </th>
                              <th
                                 scope="col"
                                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                 Destination
                              </th>
                              <th
                                 scope="col"
                                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                 Sharable Url
                              </th>
                              <th
                                 scope="col"
                                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                 Clicks
                              </th>
                              <th
                                 scope="col"
                                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                 Submissions
                              </th>
                              <th
                                 scope="col"
                                 className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                              >
                                 <span className="sr-only">Edit</span>
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                           {links.map((link: any) => (
                              <tr key={link.id}>
                                 <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    <p>{link.name}</p>
                                    <p>
                                       <small>{link.created_at_human}</small>
                                    </p>
                                 </td>
                                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {link.target}
                                 </td>
                                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <CopyToClipboard
                                       text={route("redirect.link", {
                                          slug: link.slug,
                                       })}
                                       onCopy={copiedHandler}
                                    >
                                       <div className="flex items-center space-x-2 cursor-pointer">
                                          <span className="font-[700] text-blue-700">
                                             {route("redirect.link", {
                                                slug: link.slug,
                                             })}
                                          </span>
                                          <CopyIcon className="w-4 h-4" />
                                       </div>
                                    </CopyToClipboard>
                                 </td>
                                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {link.redirects?.length ?? 0}
                                 </td>
                                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {link.leads?.length ?? 0}
                                 </td>
                                 <td className="relative whitespace-nowrap flex space-x-2 py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <button
                                       onClick={() => handleRemove(link.id)}
                                       className="bg-gray-700 text-white px-4 py-1 rounded-md shadow transition ease-in-out duration-300 hover:bg-red-600 flex flex-row"
                                    >
                                       Delete
                                    </button>
                                    <Link
                                       href={route("affiliate.show", {
                                          slug: link.slug,
                                       })}
                                       className="bg-gray-700 text-white px-4 py-1 rounded-md shadow hover:bg-green-600 transition ease-in-out duration-300 flex flex-row"
                                    >
                                       Show
                                    </Link>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
         {isPopupOpen && selectedLink && (
            <AffiliateLinkDetails
               isPopupOpen={isPopupOpen}
               closePopup={closePopup}
               linkData={selectedLink.redirects}
            />
         )}
      </div>
   );
}
