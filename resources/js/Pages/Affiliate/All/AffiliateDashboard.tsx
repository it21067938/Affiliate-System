import { Head, useForm, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import AffiliateLayout from "@/Layouts/AffiliateLayout";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";
import { PopupWindow } from "@/Components/Affiliate/PopupWindow";
import { Copy, Share2 } from "lucide-react";
import { RecentLinks } from "@/Pages/Affiliate/All/Partials/RecentLinks";

export default function AffiliateDashboard({ links }:{links:any }) {
   const { data, setData, post, processing, errors, reset } = useForm({
      target: "",
      name: "",
   });
   const handleSubmit = (e: any) => {
      e.preventDefault();
      post(route("links.store"), {
         onSuccess: (response: any) => {
            toast.success("Link generated successfully!", {
               position: "top-right",
               autoClose: 3900,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: true,
               progress: undefined,
               theme: "light",
               transition: Slide,
            });

            reset(); // Clear form input fields
         },
         onError: () => {
            toast.error("There was an error generating the link.", {
               position: "top-right",
               autoClose: 3900,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light",
               transition: Slide,
            });
         },
      });
   };

   const handleRemove = (linkId: any) => {
      post(route("links.destroy", linkId), {
         onSuccess: () => {
            // Show success notification
            toast.success("Link removed successfully!", {
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
         },
      });
   };
   return (
      <AffiliateLayout>
         <Head title="Dashboard" />

         <div className="py-12 bg-gray-100 px-4 md:px-0 space-y-8">
            <div className="container mx-auto">
               <div className="max-w-xl bg-white rounded p-6">
                  {/* Generate Tracking Link Section */}
                  <div className="flex flex-col">
                     <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                        Generate Link
                     </h2>
                     <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {/* Website Name Input */}
                           <div>
                              <InputLabel className="block text-lg font-semibold mb-2">
                                 Link Name
                              </InputLabel>
                              <TextInput
                                 required
                                 type="text"
                                 id="name"
                                 name="name"
                                 value={data.name}
                                 onChange={(e) =>
                                    setData("name", e.target.value)
                                 }
                                 placeholder="Enter Link Name"
                                 className="w-full p-3 border rounded-md shadow-md focus:outline-none focus:border-blue-400"
                              />
                              <InputError
                                 message={errors.name}
                                 className="mt-2"
                              />
                           </div>

                           {/* Website URL Input */}
                           <div>
                              <InputLabel className="block text-lg font-semibold mb-2">
                                 Website URL
                              </InputLabel>
                              <TextInput
                                 required
                                 pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
                                 type="url"
                                 id="target"
                                 name="target"
                                 value={data.target}
                                 onChange={(e) =>
                                    setData("target", e.target.value)
                                 }
                                 placeholder="Enter Website URL"
                                 className="w-full p-3 border rounded-md shadow-md focus:outline-none focus:border-blue-400"
                              />
                              <InputError
                                 message={errors.target}
                                 className="mt-2"
                              />
                           </div>
                        </div>
                        {/* Generate Link Button */}
                        <button
                           className="mt-4 bg-blue-800 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 w-full sm:w-auto transition ease-in-out duration-300"
                           disabled={processing}
                        >
                           Generate Link
                        </button>
                     </form>

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
                        transition={Slide}
                     />
                  </div>
               </div>
            </div>
            <div className="container mx-auto">
               {/* Recent Links Section */}
               <RecentLinks
                  links={links}
                  handleRemove={handleRemove}
               />
            </div>
         </div>
      </AffiliateLayout>
   );
}
