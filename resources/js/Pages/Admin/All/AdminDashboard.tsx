import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
} from "recharts";

interface PageProps {
   auth: any;
   affiliateCount: number;
   totalLinksCount: number;
   totalSiteVisitors: number;
   recentActivities?: { message: string; created_at: string }[];
   dailyLinkData: { date: string; count: number }[];
}

export default function AdminDashboard({
   auth,
   affiliateCount,
   totalLinksCount,
   totalSiteVisitors,
   recentActivities = [],
   dailyLinkData = [],
}: PageProps) {
   const formatDateTime = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleString();
   };

   return (
      <AdminLayout user={auth.user}>
         <Head title="Admin Dashboard" />

         <div className="flex bg-gray-100">
            <main className="flex-1 p-6">
               <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                     Overview
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                     <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
                        <h3 className="text-lg font-medium text-gray-500">
                           Total Affiliates
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                           {affiliateCount}
                        </p>
                     </div>
                     <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
                        <h3 className="text-lg font-medium text-gray-500">
                           Total Links Generated
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                           {totalLinksCount}
                        </p>
                     </div>
                     <div className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
                        <h3 className="text-lg font-medium text-gray-500">
                           Total Site Visitors
                        </h3>
                        <p className="text-2xl font-bold text-gray-900">
                           {totalSiteVisitors}
                        </p>
                     </div>
                  </div>
               </section>

               {/* Recent Activity Section */}
               <section className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                     Recent Activity
                  </h2>
                  <div className="bg-white p-6 shadow-lg rounded-lg max-h-64 overflow-y-scroll">
                     <ul className="space-y-2">
                        {recentActivities.length > 0 ? (
                           recentActivities.map((activity, index) => (
                              <li
                                 key={index}
                                 className="flex justify-between items-center border-b py-2"
                              >
                                 <div className="text-gray-700">
                                    {activity.message}
                                 </div>
                                 <span className="text-sm text-gray-500">
                                    {formatDateTime(activity.created_at)}
                                 </span>
                              </li>
                           ))
                        ) : (
                           <li className="text-center text-gray-500">
                              No recent activities yet.
                           </li>
                        )}
                     </ul>
                  </div>
               </section>

               {/* Site Visits Graph */}
               {dailyLinkData.length > 0 && (
                  <section className="mb-8">
                     <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Daily Links Generated
                     </h2>
                     <div className="bg-white p-6 shadow-lg rounded-lg h-96">
                        <ResponsiveContainer width="100%" height="100%">
                           <LineChart data={dailyLinkData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Line
                                 type="monotone"
                                 dataKey="count"
                                 stroke="#8884d8"
                                 strokeWidth={2}
                              />
                           </LineChart>
                        </ResponsiveContainer>
                     </div>
                  </section>
               )}
            </main>
         </div>
      </AdminLayout>
   );
}
