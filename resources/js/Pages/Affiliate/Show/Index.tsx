import AffiliateLayout from "@/Layouts/AffiliateLayout";
import { Head, Link } from "@inertiajs/react";
import "react-toastify/dist/ReactToastify.css";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { ArrowBack } from "@mui/icons-material";

export default function LinkInformation({ link }: { link: any }) {
   return (
      <AffiliateLayout>
         <Head title="Link Information" />
         <div className="py-12 bg-gray-100 px-4 md:px-0 space-y-8 min-h-screen">
            <div className="container mx-auto">
               <div className="flex flex-col">
                  <div className="flex">
                     <Link
                        href={route("affiliate.dashboard")}
                        className="bg-gray-800 items-center px-6 py-2 rounded mb-4 text-white flex"
                     >
                        <ArrowBack className="h-6 w-6 text-white" />
                        <span>Back</span>
                     </Link>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                     Link Information
                  </h2>
               </div>
               {/*  */}
               <div>
                  <DataCard link={link} />
               </div>
               <div className="mt-12">
                  <Leads leads={link.leads} />
               </div>
            </div>
         </div>
      </AffiliateLayout>
   );
}

function DataCard({ link }: any) {
   return (
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
         <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
               <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                     Link name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                     {link.name}
                  </dd>
               </div>
               <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                     Destination URL
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                     {link.target}
                  </dd>
               </div>
               <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">Url</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                     {route("redirect.link", {
                        slug: link.slug,
                     })}
                  </dd>
               </div>
               <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                     Total Clicks
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                     {link.redirects?.length ?? 0}
                  </dd>
               </div>
               <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                     Total Leads
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                     {link.leads?.length ?? 0}
                  </dd>
               </div>
            </dl>
         </div>
      </div>
   );
}

function Leads({ leads }: any) {
   console.log(leads);
   return (
      <div className="px-4 sm:px-6 lg:px-0">
         <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
               <h2 className="text-2xl sm:text-3xl font-bold">Leads</h2>
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
                                 Form
                              </th>
                              <th
                                 scope="col"
                                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                 Email
                              </th>
                              <th
                                 scope="col"
                                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                 Name
                              </th>
                              <th
                                 scope="col"
                                 className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                 Time
                              </th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                           {leads.map((lead: any) => (
                              <tr key={lead.id}>
                                 <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                    {lead.form_name}
                                 </td>
                                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {lead.meta_data?.["your name"]}
                                 </td>
                                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {lead.meta_data?.["email"]}
                                 </td>
                                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {lead.created_at_human}
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
